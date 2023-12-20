
const axios = require('axios');

const BASE_URL = 'https://cert.api.fiservapps.com/ch/payments/v1';
var computedHmac = b64encode(computedHash.toString());

const headers = {
    'Content-Type': 'application/json',
    'Client-Request-Id': Math.floor((Math.random() * 10000000) + 1),
    'Api-Key': 'Your-API-Key',  // Include your actual API key here
    'Timestamp': new Date().getTime(),
    'Auth-Token-Type': 'HMAC',
    'Authorization': b64encode(computedHash.toString()),
  };


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