// import axios from 'axios';
// import express from 'express';
// import cors from 'cors';

// const app = express();
// app.use(cors());
// const PORT = 8080;

// app.listen(PORT, () => {
// 	console.log(`Server running at : http://localhost:${PORT}/`);
// });

// async function getManagementApiToken() {
// 	const options = {
// 		method: 'POST',
// 		url: 'https://dev-wyvx8c2jswjwvuxo.us.auth0.com/oauth/token',
// 		headers: { 'content-type': 'application/json' },
// 		data: {
// 			client_id: 'pERLNKBQu6My2BO1JjwLjt01598HRECR',
// 			client_secret:
// 				'SDJWwk2NQ3hy_qdxXIfoHESjo37GevULaq-K0IOgW0fYUsS3Ka17wleBd9sjHOUE',
// 			audience: 'https://dev-wyvx8c2jswjwvuxo.us.auth0.com/api/v2/',
// 			grant_type: 'client_credentials',
// 		},
// 	};

// 	const response = await axios(options);
// 	console.log(response);
// 	return response.data.access_token;
// }

// async function createUserWithMetadata(formData) {
// 	const token = await getManagementApiToken();

// 	const options = {
// 		method: 'POST',
// 		url: `https://dev-wyvx8c2jswjwvuxo.us.auth0.com/api/v2/users`,
// 		headers: {
// 			'content-type': 'application/json',
// 			Authorization: `Bearer ${token}`,
// 			// Use the token from getManagementApiToken
// 		},
// 		data: {
// 			// Include other necessary user fields like email, password, connection, etc.
// 			email: 'parham.saniei@buildfailed.io',
// 			password: 'ChickenNugget12!', // Set a secure password
// 			connection: 'Username-Password-Authentication', // Update with your connection
// 			user_metadata: formData, // Include the form data as user metadata
// 		},
// 	};

// 	try {
// 		const response = await axios(options);
// 		console.log('New user created:', response.data);
// 	} catch (error) {
// 		console.log('Error creating new user:', error);
// 	}
// }

// createUserWithMetadata();

// app.post('/get-management-token', async (req, res) => {
// 	const options = {
// 		method: 'POST',
// 		url: 'https://dev-wyvx8c2jswjwvuxo.us.auth0.com/oauth/token',
// 		headers: { 'content-type': 'application/json' },
// 		data: {
// 			client_id: 'pERLNKBQu6My2BO1JjwLjt01598HRECR',
// 			client_secret:
// 				'SDJWwk2NQ3hy_qdxXIfoHESjo37GevULaq-K0IOgW0fYUsS3Ka17wleBd9sjHOUE',
// 			audience: 'https://dev-wyvx8c2jswjwvuxo.us.auth0.com/api/v2/',
// 			grant_type: 'client_credentials',
// 		},
// 	};

// 	try {
// 		const response = await axios(options);
// 		res.send(response.data.access_token);
// 	} catch (error) {
// 		console.log('Error obtaining Management API Token:', error);
// 		res.status(500).send('Failed to obtain token');
// 	}
// });



/*
eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6Ijh0ZktaeldkSW5RYnRTclpNb2YzZSJ9
	.eyJpc3MiOiJodHRwczovL2Rldi13eXZ4OGMyanN3and2dXhvLnVzLmF1dGgwLmNvbS8iLCJzdWIiOiJwRVJMTktCUXU2TXkyQk8xSmp3TGp0MDE1OThIUkVDUkBjbGllbnRzIiwiYXVkIjoiaHR0cHM6Ly9kZXYtd3l2eDhjMmpzd2p3dnV4by51cy5hdXRoMC5jb20vYXBpL3YyLyIsImlhdCI6MTcwMzc3MzQ4MCwiZXhwIjoxNzAzODU5ODgwLCJhenAiOiJwRVJMTktCUXU2TXkyQk8xSmp3TGp0MDE1OThIUkVDUiIsInNjb3BlIjoicmVhZDpjbGllbnRfZ3JhbnRzIGNyZWF0ZTpjbGllbnRfZ3JhbnRzIGRlbGV0ZTpjbGllbnRfZ3JhbnRzIHVwZGF0ZTpjbGllbnRfZ3JhbnRzIHJlYWQ6dXNlcnMgdXBkYXRlOnVzZXJzIGRlbGV0ZTp1c2VycyBjcmVhdGU6dXNlcnMgcmVhZDp1c2Vyc19hcHBfbWV0YWRhdGEgdXBkYXRlOnVzZXJzX2FwcF9tZXRhZGF0YSBkZWxldGU6dXNlcnNfYXBwX21ldGFkYXRhIGNyZWF0ZTp1c2Vyc19hcHBfbWV0YWRhdGEgcmVhZDp1c2VyX2N1c3RvbV9ibG9ja3MgY3JlYXRlOnVzZXJfY3VzdG9tX2Jsb2NrcyBkZWxldGU6dXNlcl9jdXN0b21fYmxvY2tzIGNyZWF0ZTp1c2VyX3RpY2tldHMgcmVhZDpjbGllbnRzIHVwZGF0ZTpjbGllbnRzIGRlbGV0ZTpjbGllbnRzIGNyZWF0ZTpjbGllbnRzIHJlYWQ6Y2xpZW50X2tleXMgdXBkYXRlOmNsaWVudF9rZXlzIGRlbGV0ZTpjbGllbnRfa2V5cyBjcmVhdGU6Y2xpZW50X2tleXMgcmVhZDpjb25uZWN0aW9ucyB1cGRhdGU6Y29ubmVjdGlvbnMgZGVsZXRlOmNvbm5lY3Rpb25zIGNyZWF0ZTpjb25uZWN0aW9ucyByZWFkOnJlc291cmNlX3NlcnZlcnMgdXBkYXRlOnJlc291cmNlX3NlcnZlcnMgZGVsZXRlOnJlc291cmNlX3NlcnZlcnMgY3JlYXRlOnJlc291cmNlX3NlcnZlcnMgcmVhZDpkZXZpY2VfY3JlZGVudGlhbHMgdXBkYXRlOmRldmljZV9jcmVkZW50aWFscyBkZWxldGU6ZGV2aWNlX2NyZWRlbnRpYWxzIGNyZWF0ZTpkZXZpY2VfY3JlZGVudGlhbHMgcmVhZDpydWxlcyB1cGRhdGU6cnVsZXMgZGVsZXRlOnJ1bGVzIGNyZWF0ZTpydWxlcyByZWFkOnJ1bGVzX2NvbmZpZ3MgdXBkYXRlOnJ1bGVzX2NvbmZpZ3MgZGVsZXRlOnJ1bGVzX2NvbmZpZ3MgcmVhZDpob29rcyB1cGRhdGU6aG9va3MgZGVsZXRlOmhvb2tzIGNyZWF0ZTpob29rcyByZWFkOmFjdGlvbnMgdXBkYXRlOmFjdGlvbnMgZGVsZXRlOmFjdGlvbnMgY3JlYXRlOmFjdGlvbnMgcmVhZDplbWFpbF9wcm92aWRlciB1cGRhdGU6ZW1haWxfcHJvdmlkZXIgZGVsZXRlOmVtYWlsX3Byb3ZpZGVyIGNyZWF0ZTplbWFpbF9wcm92aWRlciBibGFja2xpc3Q6dG9rZW5zIHJlYWQ6c3RhdHMgcmVhZDppbnNpZ2h0cyByZWFkOnRlbmFudF9zZXR0aW5ncyB1cGRhdGU6dGVuYW50X3NldHRpbmdzIHJlYWQ6bG9ncyByZWFkOmxvZ3NfdXNlcnMgcmVhZDpzaGllbGRzIGNyZWF0ZTpzaGllbGRzIHVwZGF0ZTpzaGllbGRzIGRlbGV0ZTpzaGllbGRzIHJlYWQ6YW5vbWFseV9ibG9ja3MgZGVsZXRlOmFub21hbHlfYmxvY2tzIHVwZGF0ZTp0cmlnZ2VycyByZWFkOnRyaWdnZXJzIHJlYWQ6Z3JhbnRzIGRlbGV0ZTpncmFudHMgcmVhZDpndWFyZGlhbl9mYWN0b3JzIHVwZGF0ZTpndWFyZGlhbl9mYWN0b3JzIHJlYWQ6Z3VhcmRpYW5fZW5yb2xsbWVudHMgZGVsZXRlOmd1YXJkaWFuX2Vucm9sbG1lbnRzIGNyZWF0ZTpndWFyZGlhbl9lbnJvbGxtZW50X3RpY2tldHMgcmVhZDp1c2VyX2lkcF90b2tlbnMgY3JlYXRlOnBhc3N3b3Jkc19jaGVja2luZ19qb2IgZGVsZXRlOnBhc3N3b3Jkc19jaGVja2luZ19qb2IgcmVhZDpjdXN0b21fZG9tYWlucyBkZWxldGU6Y3VzdG9tX2RvbWFpbnMgY3JlYXRlOmN1c3RvbV9kb21haW5zIHVwZGF0ZTpjdXN0b21fZG9tYWlucyByZWFkOmVtYWlsX3RlbXBsYXRlcyBjcmVhdGU6ZW1haWxfdGVtcGxhdGVzIHVwZGF0ZTplbWFpbF90ZW1wbGF0ZXMgcmVhZDptZmFfcG9saWNpZXMgdXBkYXRlOm1mYV9wb2xpY2llcyByZWFkOnJvbGVzIGNyZWF0ZTpyb2xlcyBkZWxldGU6cm9sZXMgdXBkYXRlOnJvbGVzIHJlYWQ6cHJvbXB0cyB1cGRhdGU6cHJvbXB0cyByZWFkOmJyYW5kaW5nIHVwZGF0ZTpicmFuZGluZyBkZWxldGU6YnJhbmRpbmcgcmVhZDpsb2dfc3RyZWFtcyBjcmVhdGU6bG9nX3N0cmVhbXMgZGVsZXRlOmxvZ19zdHJlYW1zIHVwZGF0ZTpsb2dfc3RyZWFtcyBjcmVhdGU6c2lnbmluZ19rZXlzIHJlYWQ6c2lnbmluZ19rZXlzIHVwZGF0ZTpzaWduaW5nX2tleXMgcmVhZDpsaW1pdHMgdXBkYXRlOmxpbWl0cyBjcmVhdGU6cm9sZV9tZW1iZXJzIHJlYWQ6cm9sZV9tZW1iZXJzIGRlbGV0ZTpyb2xlX21lbWJlcnMgcmVhZDplbnRpdGxlbWVudHMgcmVhZDphdHRhY2tfcHJvdGVjdGlvbiB1cGRhdGU6YXR0YWNrX3Byb3RlY3Rpb24gcmVhZDpvcmdhbml6YXRpb25zX3N1bW1hcnkgY3JlYXRlOmF1dGhlbnRpY2F0aW9uX21ldGhvZHMgcmVhZDphdXRoZW50aWNhdGlvbl9tZXRob2RzIHVwZGF0ZTphdXRoZW50aWNhdGlvbl9tZXRob2RzIGRlbGV0ZTphdXRoZW50aWNhdGlvbl9tZXRob2RzIHJlYWQ6b3JnYW5pemF0aW9ucyB1cGRhdGU6b3JnYW5pemF0aW9ucyBjcmVhdGU6b3JnYW5pemF0aW9ucyBkZWxldGU6b3JnYW5pemF0aW9ucyBjcmVhdGU6b3JnYW5pemF0aW9uX21lbWJlcnMgcmVhZDpvcmdhbml6YXRpb25fbWVtYmVycyBkZWxldGU6b3JnYW5pemF0aW9uX21lbWJlcnMgY3JlYXRlOm9yZ2FuaXphdGlvbl9jb25uZWN0aW9ucyByZWFkOm9yZ2FuaXphdGlvbl9jb25uZWN0aW9ucyB1cGRhdGU6b3JnYW5pemF0aW9uX2Nvbm5lY3Rpb25zIGRlbGV0ZTpvcmdhbml6YXRpb25fY29ubmVjdGlvbnMgY3JlYXRlOm9yZ2FuaXphdGlvbl9tZW1iZXJfcm9sZXMgcmVhZDpvcmdhbml6YXRpb25fbWVtYmVyX3JvbGVzIGRlbGV0ZTpvcmdhbml6YXRpb25fbWVtYmVyX3JvbGVzIGNyZWF0ZTpvcmdhbml6YXRpb25faW52aXRhdGlvbnMgcmVhZDpvcmdhbml6YXRpb25faW52aXRhdGlvbnMgZGVsZXRlOm9yZ2FuaXphdGlvbl9pbnZpdGF0aW9ucyByZWFkOnNjaW1fY29uZmlnIGNyZWF0ZTpzY2ltX2NvbmZpZyB1cGRhdGU6c2NpbV9jb25maWcgZGVsZXRlOnNjaW1fY29uZmlnIGNyZWF0ZTpzY2ltX3Rva2VuIHJlYWQ6c2NpbV90b2tlbiBkZWxldGU6c2NpbV90b2tlbiBkZWxldGU6cGhvbmVfcHJvdmlkZXJzIGNyZWF0ZTpwaG9uZV9wcm92aWRlcnMgcmVhZDpwaG9uZV9wcm92aWRlcnMgdXBkYXRlOnBob25lX3Byb3ZpZGVycyBkZWxldGU6cGhvbmVfdGVtcGxhdGVzIGNyZWF0ZTpwaG9uZV90ZW1wbGF0ZXMgcmVhZDpwaG9uZV90ZW1wbGF0ZXMgdXBkYXRlOnBob25lX3RlbXBsYXRlcyBjcmVhdGU6ZW5jcnlwdGlvbl9rZXlzIHJlYWQ6ZW5jcnlwdGlvbl9rZXlzIHVwZGF0ZTplbmNyeXB0aW9uX2tleXMgZGVsZXRlOmVuY3J5cHRpb25fa2V5cyByZWFkOnNlc3Npb25zIGRlbGV0ZTpzZXNzaW9ucyByZWFkOnJlZnJlc2hfdG9rZW5zIGRlbGV0ZTpyZWZyZXNoX3Rva2VucyIsImd0eSI6ImNsaWVudC1jcmVkZW50aWFscyJ9
	.TPnHl94U2XdExrp4j1IveJlBuESr -
	p2dmiAXNrLh34T5pTuyJ82_7XrbRtwwp4jIliMp6ZkKVZLVehFBsT5o7y8ceiarUni2kyPda1YQsZOsHFEYlGtPSj2FixMK80557jFOqcyPjiDrMCzlByD8EA -
	_CR1QioUwsQnOtDJLWxj9IQYJiS9tKHGIR -
	hzw9dy3 -
	tcNhprO8Ez_R9GSx6vL1VDYqQ4sh4P2zwvgUXrHvMgmJGOH -
	QYKg90IyQTBI0uiHtd0tm1M2WI1hgyCk6lHYVAeJGE50LaCeaeQy6DIpmotCvgJOrbR80M3Y_nkwoYc_eCW83bZose_85OVf_fdw; */



  