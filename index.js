import express from 'express';
import { createConnection } from 'mysql';
import fs from 'fs';
import { auth } from 'express-oauth2-jwt-bearer';
import axios from 'axios';
import cors from 'cors';
import CryptoJS from 'crypto-js';

const key = 'XoYFvbSP7M79nrijXydCJBSXy1JsbW8b';
const secret = 'g8GkQUCTJaZk26GQtsNKLT253SPwPN4lSTiMlEcTVPV';



const sql = fs.readFileSync('./data.sql').toString();
const app = express();
app.use(cors());
const PORT = 8000;

// authorization from auth0
const jwtCheck = auth({
	audience: 'http:localhost:3010/api/private',
	issuerBaseURL: 'https://dev-wyvx8c2jswjwvuxo.us.auth0.com/',
	tokenSigningAlg: 'RS256',
});

// enforces on all endpoints
// app.use(jwtCheck);

// test endpoint for auth0
app.get('/authorized', jwtCheck, function (req, res) {
	const options = {
		method: 'POST',
		url: 'https://dev-wyvx8c2jswjwvuxo.us.auth0.com/oauth/token',
		headers: { 'content-type': 'application/json' },
		data: {
			client_id: 'Fwc1BoClOwXqMJtg2jL1WdfNbwrKybqP',
			client_secret:
				'NmgmuHgNNNM-NOoZVPMYgMNWxpbPyRss-hfqwRXAUvus9-dHawn5sXbjp9vsNxl8',
			audience: 'http:localhost:3010/api/private',
			grant_type: 'client_credentials',
		},
	};

	axios(options)
		.then((response) => {
			console.log(response.data);
		})
		.catch((error) => {
			console.error('Error making request:', error);
		});
});

// establishes connection for mysql DB
const con = createConnection({
	host: 'localhost',
	user: 'root',
	password: '',

	// // uncomment after running the query on line 22
	// // and type db name after running for the first time
	database: 'proof',
	// ***************

	multipleStatements: true,
});

// logs successful connection && has query to initialize DB if not already initialized
// con.connect(function (err) {
//   if (err) throw err;
//   console.log('Connected!');

//   con.query(sql, function (err, result) {
//     if (err) throw err;
//     console.log('Database and table created');
//   });

// });
app.use(express.json());


app.post('/charges', (req, res) => {
	try {
	  const BASE_URL = 'https://cert.api.fiservapps.com/ch/payments/v1/charges';
  
	  const {
		email,
		nameOnCard,
		cardNum,
		price,
		cardExpMonth,
		cardExpYear,
		cvc,
		address,
		city,
		state,
		postalCode,
		paymentAmount,
		paymentDate } = req.body;

	
	  const request = {
		"amount": {
		  "total": price,
		  "currency": "USD"
		},
		"source": {
		  "sourceType": "PaymentCard",
		  "card": {
			"cardData": cardNum,
			"expirationMonth": cardExpMonth,
			"expirationYear": cardExpYear
		  }
		},
		"transactionDetails": {
		  "captureFlag": true
		},
		"merchantDetails": {
		  "merchantId": "100008000003683",
		  "terminalId": "10000001"
		}
	  };
  
	  const requestBody = JSON.stringify(request);
	  const ClientRequestId = Math.floor((Math.random() * 10000000) + 1);
	  const time = new Date().getTime();
	  const rawSignature = key + ClientRequestId + time + requestBody;
  
	  let computedHash = CryptoJS.algo.HMAC.create(CryptoJS.algo.SHA256, secret.toString());
	  computedHash.update(rawSignature);
	  computedHash = computedHash.finalize();
	  const computedHmac = b64encode(computedHash.toString());
  
	  const headers = {
		'Content-Type': 'application/json',
		'Client-Request-Id': ClientRequestId,
		'Api-Key': key,
		'Timestamp': time,
		'Auth-Token-Type': 'HMAC',
		'Authorization': computedHmac
	  };
  
	  axios.post(BASE_URL, requestBody, { headers })
		.then(response => res.json(response.data))
		.catch(error => {
		  console.error("Error making paymentHERE: ", error.response.data);
		  res.status(500).json({ error: 'Error making payment' });
		});


		} catch (error) {
		console.error("Error making payment: ", error);
		res.status(500).json({ error: 'Error making payment' });
	}
  });



app.use(function (err, req, res, next) {
	console.error(err.stack);
	return res.set(err.headers).status(err.status).json({ message: err.message });
});

app.listen(PORT, () => {
	console.log(`Server running at : http://localhost:${PORT}/`);
});

app.get('/Users', (req, res) => {
	con.query('SELECT * FROM Users', function (err, rows) {
		if (!err) {
			res.send(JSON.stringify(rows));
		} else {
			console.error('Error while performing Query:', err);
			res.status(500).json({ error: 'Internal Server Error' });
		}
	});
});

app.post('/Users', (req, res) => {
	const { UserID, UserType, Username, PasswordHash, Email } = req.body;
	const query =
		'INSERT INTO Users (UserID, UserType, Username, PasswordHash, Email) VALUES (?, ?, ?, ?, ?)';
	con.query(
		query,
		[UserID, UserType, Username, PasswordHash, Email],
		function (err) {
			if (!err) {
				res.send('User created successfully.');
			} else {
				console.error('Error while performing Query:', err);
				res.status(500).json({ error: 'Internal Server Error' });
			}
		}
	);
});

app.put('/Users/:id', (req, res) => {
	const { UserType, Username, PasswordHash, Email } = req.body;
	const UserID = req.params.id;
	const query =
		'UPDATE Users SET UserType = ?, Username = ?, PasswordHash = ?, Email = ? WHERE UserID = ?';
	con.query(
		query,
		[UserType, Username, PasswordHash, Email, UserID],
		function (err) {
			if (!err) {
				res.send('User updated successfully.');
			} else {
				console.error('Error while performing Query:', err);
				res.status(500).json({ error: 'Internal Server Error' });
			}
		}
	);
});

app.delete('/Users/:id', (req, res) => {
	const UserID = req.params.id;
	const query = 'DELETE FROM Users WHERE UserID = ?';
	con.query(query, [UserID], function (err) {
		if (!err) {
			res.send('User deleted successfully.');
		} else {
			console.error('Error while performing Query:', err);
			res.status(500).json({ error: 'Internal Server Error' });
		}
	});
});

app.get('/PaymentMethods', (req, res) => {
	con.query('SELECT * FROM PaymentMethods', function (err, rows) {
		if (!err) {
			res.send(rows);
		} else {
			console.error('Error while performing Query:', err);
			res.status(500).json({ error: 'Internal Server Error' });
		}
	});
});

app.post('/PaymentMethods', (req, res) => {
	const { MethodID, MethodType } = req.body;
	const query =
		'INSERT INTO PaymentMethods (MethodID, MethodType) VALUES (?, ?)';
	con.query(query, [MethodID, MethodType], function (err) {
		if (!err) {
			res.send('Payment method added successfully.');
		} else {
			console.error('Error while performing Query:', err);
			res.status(500).json({ error: 'Internal Server Error' });
		}
	});
});

app.put('/PaymentMethods/:id', (req, res) => {
	const MethodID = req.params.id;
	const { MethodType } = req.body;
	const query =
		'UPDATE PaymentMethods SET UserID = ?, MethodType = ?, CardNumber = ? WHERE MethodID = ?';
	con.query(query, [MethodType, MethodID], function (err) {
		if (!err) {
			res.send('Payment method updated successfully.');
		} else {
			console.error('Error while performing Query:', err);
			res.status(500).json({ error: 'Internal Server Error' });
		}
	});
});

app.delete('/PaymentMethods/:id', (req, res) => {
	const MethodID = req.params.id;
	const query = 'DELETE FROM PaymentMethods WHERE MethodID = ?';
	con.query(query, [MethodID], function (err) {
		if (!err) {
			res.send('Payment method deleted successfully.');
		} else {
			console.error('Error while performing Query:', err);
			res.status(500).json({ error: 'Internal Server Error' });
		}
	});
});

app.get('/Properties', (req, res) => {
	con.query('SELECT * FROM Properties', function (err, rows) {
		if (!err) {
			res.send(rows);
		} else {
			console.error('Error while performing Query:', err);
			res.status(500).json({ error: 'Internal Server Error' });
		}
	});
});

app.post('/Properties', (req, res) => {
	const {
		PropertyID,
		LandlordID,
		Rent,
		Address,
		Unit,
		DueDayOfMonth,
		OutstandingBalance,
	} = req.body;
	const query =
		'INSERT INTO Properties (PropertyID, LandlordID, Rent, Address, Unit, DueDayOfMonth, OutstandingBalance) VALUES (?, ?, ?, ?, ?, ?)';
	con.query(
		query,
		[
			PropertyID,
			LandlordID,
			Rent,
			Address,
			Unit,
			DueDayOfMonth,
			OutstandingBalance,
		],
		function (err) {
			if (!err) {
				res.send('Property added successfully.');
			} else {
				console.error('Error while performing Query:', err);
				res.status(500).json({ error: 'Internal Server Error' });
			}
		}
	);
});

app.put('/Properties/:id', (req, res) => {
	const PropertyID = req.params.id;
	const { LandlordID, Rent, Address, Unit, DueDayOfMonth, OutstandingBalance } =
		req.body;
	const query =
		'UPDATE Properties SET LandlordID = ?, Rent = ?, Address = ?, Unit = ?, DueDayOfMonth = ?, OutstandingBalance = ? WHERE PropertyID = ?';
	con.query(
		query,
		[
			PropertyID,
			LandlordID,
			Rent,
			Address,
			Unit,
			DueDayOfMonth,
			OutstandingBalance,
		],
		function (err) {
			if (!err) {
				res.send('Property updated successfully.');
			} else {
				console.error('Error while performing Query:', err);
				res.status(500).json({ error: 'Internal Server Error' });
			}
		}
	);
});

app.delete('/Properties/:id', (req, res) => {
	const PropertyID = req.params.id;
	const query = 'DELETE FROM Properties WHERE PropertyID = ?';
	con.query(query, [PropertyID], function (err) {
		if (!err) {
			res.send('Property deleted successfully.');
		} else {
			console.error('Error while performing Query:', err);
			res.status(500).json({ error: 'Internal Server Error' });
		}
	});
});

app.get('/Transactions', (req, res) => {
	con.query('SELECT * FROM Transactions', function (err, rows) {
		if (!err) {
			res.send(rows);
		} else {
			console.error('Error while performing Query:', err);
			res.status(500).json({ error: 'Internal Server Error' });
		}
	});
});

app.post('/Transactions', (req, res) => {
	const {
		TransactionID,
		PropertyID,
		TenantID,
		Amount,
		PaymentMethodID,
		TransactionDate,
		CardNumber,
		RoutingNumber,
		DigitalWalletConfirmation,
		FiservPaymentID,
	} = req.body;
	const query =
		'INSERT INTO Transactions (TransactionID, PropertyID, TenantID, Amount, PaymentMethodID, TransactionDate, CardNumber, RoutingNumber, DigitalWalletConfirmation, FiservPaymentID) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
	con.query(
		query,
		[
			TransactionID,
			PropertyID,
			TenantID,
			Amount,
			PaymentMethodID,
			TransactionDate,
			CardNumber,
			RoutingNumber,
			DigitalWalletConfirmation,
			FiservPaymentID,
		],
		function (err) {
			if (!err) {
				res.send('Transaction added successfully.');
			} else {
				console.error('Error while performing Query:', err);
				res.status(500).json({ error: 'Internal Server Error' });
			}
		}
	);
});

app.put('/Transactions/:id', (req, res) => {
	const TransactionID = req.params.id;
	const {
		PropertyID,
		TenantID,
		Amount,
		PaymentMethodID,
		TransactionDate,
		CardNumber,
		RoutingNumber,
		DigitalWalletConfirmation,
		FiservPaymentID,
	} = req.body;
	const query =
		'UPDATE Transactions SET PropertyID = ?, TenantID = ?, Amount = ?, PaymentMethodID = ?, TransactionDate = ?, CardNumber = ?, RoutingNumber = ?, DigitalWalletConfirmation = ?, FiservPaymentID = ? WHERE TransactionID = ?';
	con.query(
		query,
		[
			PropertyID,
			TenantID,
			Amount,
			PaymentMethodID,
			TransactionID,
			TransactionDate,
			CardNumber,
			RoutingNumber,
			DigitalWalletConfirmation,
			FiservPaymentID,
		],
		function (err) {
			if (!err) {
				res.send('Transaction updated successfully.');
			} else {
				console.error('Error while performing Query:', err);
				res.status(500).json({ error: 'Internal Server Error' });
			}
		}
	);
});

app.delete('/Transactions/:id', (req, res) => {
	const TransactionID = req.params.id;
	const query = 'DELETE FROM Transactions WHERE TransactionID = ?';
	con.query(query, [TransactionID], function (err) {
		if (!err) {
			res.send('Transaction deleted successfully.');
		} else {
			console.error('Error while performing Query:', err);
			res.status(500).json({ error: 'Internal Server Error' });
		}
	});
});

app.get('/PaymentHistory', (req, res) => {
	con.query('SELECT * FROM PaymentHistory', function (err, rows) {
		if (!err) {
			res.send(rows);
		} else {
			console.error('Error while performing Query:', err);
			res.status(500).json({ error: 'Internal Server Error' });
		}
	});
});

app.post('/PaymentHistory', (req, res) => {
	const { PaymentID, TransactionID, Status, ReceiptURL } = req.body;
	const query =
		'INSERT INTO PaymentHistory (PaymentID, TransactionID, Status, ReceiptURL) VALUES (?, ?, ?, ?)';
	con.query(
		query,
		[PaymentID, TransactionID, Status, ReceiptURL],
		function (err) {
			if (!err) {
				res.send('Payment history record added successfully.');
			} else {
				console.error('Error while performing Query:', err);
				res.status(500).json({ error: 'Internal Server Error' });
			}
		}
	);
});

app.put('/PaymentHistory/:id', (req, res) => {
	const PaymentID = req.params.id;
	const { TransactionID, Status, ReceiptURL } = req.body;
	const query =
		'UPDATE PaymentHistory SET TransactionID = ?, Status = ?, ReceiptURL = ? WHERE PaymentID = ?';
	con.query(
		query,
		[TransactionID, Status, ReceiptURL, PaymentID],
		function (err) {
			if (!err) {
				res.send('Payment history record updated successfully.');
			} else {
				console.error('Error while performing Query:', err);
				res.status(500).json({ error: 'Internal Server Error' });
			}
		}
	);
});

app.delete('/PaymentHistory/:id', (req, res) => {
	const PaymentID = req.params.id;
	const query = 'DELETE FROM PaymentHistory WHERE PaymentID = ?';
	con.query(query, [PaymentID], function (err) {
		if (!err) {
			res.send('Payment history record deleted successfully.');
		} else {
			console.error('Error while performing Query:', err);
			res.status(500).json({ error: 'Internal Server Error' });
		}
	});
});



function b64encode (input) {
    var swaps = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z",  "a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z","0","1","2","3","4","5","6","7","8","9","+","/"],
    tb, ib = "",
    output = "",
    i, L;
    for (i=0, L = input.length; i < L; i++) {
        tb = input.charCodeAt(i).toString(2);
        while (tb.length < 8) {
            tb = "0"+tb;
            }
        ib = ib + tb;
        while (ib.length >= 6) {
            output = output + swaps[parseInt(ib.substring(0,6),2)];
            ib = ib.substring(6);
            }
    }
    if (ib.length == 4) {
        tb = ib + "00";
        output += swaps[parseInt(tb,2)] + "=";
    }
    if (ib.length == 2) {
        tb = ib + "0000";
        output += swaps[parseInt(tb,2)] + "==";
    }
    return output;
  }

  

// Auth0 api token user
app.post('/get-management-token', async (req, res) => {
	const options = {
		method: 'POST',
		url: 'https://dev-wyvx8c2jswjwvuxo.us.auth0.com/oauth/token',
		headers: { 'content-type': 'application/json' },
		data: {
			client_id: 'pERLNKBQu6My2BO1JjwLjt01598HRECR',
			client_secret:
				'SDJWwk2NQ3hy_qdxXIfoHESjo37GevULaq-K0IOgW0fYUsS3Ka17wleBd9sjHOUE',
			audience: 'https://dev-wyvx8c2jswjwvuxo.us.auth0.com/api/v2/',
			grant_type: 'client_credentials',
		},
	};

	try {
		const response = await axios(options);
		res.send(response.data.access_token);
	} catch (error) {
		console.log('Error obtaining Management API Token:', error);
		res.status(500).send('Failed to obtain token');
	}
});

app.post('/Receipts', (req, res) => {
	const { paymentAmount, address, city, state, postalCode, nameOnCard, paymentDate } = req.body;
	const fullAddress = `${address}, ${city}, ${state} ${postalCode}`;
	const query =
		'INSERT INTO Receipts (PaymentAmount, Address, Name, PaymentDate) VALUES (?, ?, ?, ?)';
	con.query(
		query,
		[paymentAmount, fullAddress, nameOnCard, paymentDate],
		function (err) {
			if (!err) {
				res.send('Payment created successfully.');
			} else {
				console.error('Error while performing Query:', err);
				res.status(500).json({ error: 'Internal Server Error' });
			}
		}
	);
});


app.get('/Receipts', (req, res) => {
	con.query('SELECT * FROM Receipts', function (err, rows) {
		if (!err) {
			res.send(JSON.stringify(rows));
		} else {
			console.error('Error while performing Query:', err);
			res.status(500).json({ error: 'Internal Server Error' });
		}
	});
});




app.get('/get-roles', async (req, res) => {
	let config = {
		method: 'get',
		maxBodyLength: Infinity,
		url: 'https://dev-wyvx8c2jswjwvuxo.us.auth0.com/api/v2/roles/rol_q3kxgXHvsT0KfWXv/users',
		headers: {
			Accept: 'application/json',
		},
  };
  
  const response = await axios(config);
  res.send(response);
  console.log(response)

	// axios
	// 	.request(config)
	// 	.then((response) => {
	// 		console.log(JSON.stringify(response.data));
	// 	})
	// 	.catch((error) => {
	// 		console.log(error);
	// 	});
});
