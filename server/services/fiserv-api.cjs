var CryptoJS = require('crypto-js');
const axios = require('axios');

const BASE_URL = 'https://cert.api.fiservapps.com/ch/payments/v1/charges';

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

const request = {
  "amount": {
    "total": 12.04,
    "currency": "USD"
  },
  "source": {
    "sourceType": "PaymentCard",
    "card": {
      "cardData": "4005550000000019",
      "expirationMonth": "02",
      "expirationYear": "2035"
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
var key = 'qFDkVPXamUL4n3KoRt4qxgT34fuScRtl';
var secret = '5bxKL76aRPDiwuAG1g0J0rGak4RaxCchkQLNU4skyWW';

var ClientRequestId = Math.floor((Math.random() * 10000000) + 1);
var time = new Date().getTime();
var method = request.method;
var requestBody = request.data;
var rawSignature = key + ClientRequestId + time + requestBody;

var computedHash = CryptoJS.algo.HMAC.create(CryptoJS.algo.SHA256, secret.toString());
computedHash.update(rawSignature);
computedHash = computedHash.finalize();
var computedHmac = b64encode(computedHash.toString());

const headers = {
    'Content-Type': 'application/json',
    'Client-Request-Id': ClientRequestId, 
    'Api-Key': apiKey,
    'Timestamp': time,
    'Auth-Token-Type': 'HMAC',
    'Authorization': computedHmac
}


  async function makePayment(paymentData) {
    try {
      const response = await axios.post(fiservApiEndpoint, paymentData, { headers });
      return response.data;
    } catch (error) {
      console.error('Error making payment:', error.response.data);
      throw error;
    }
  }


// Add more functions as needed...

module.exports = {
  makePayment,
  // Add more exports as needed...
};


console.log(axios.post(BASE_URL, request, { headers }));
console.log(computedHmac);