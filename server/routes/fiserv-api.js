const axios = require('axios');

const BASE_URL = 'https://cert.api.fiservapps.com/ch/payments/v1';


class FiservAPI {
    constructor(apiKey) {
      this.BASE_URL = 'https://prod.api.fiservapps.com/ch/payments/v1';
      this.apiKey = apiKey;
    }
}

async function makePayment(paymentData) {
  try {
    const response = await axios.post(`${BASE_URL}/charges`, paymentData);
    return response.data;
  } catch (error) {
    console.error('Error making payment:', error);
    throw error;
  }
}


async function lookupPayment(transactionId) {
  try {
    const response = await axios.get(`${BASE_URL}/lookups/${transactionId}`);
    return response.data;
  } catch (error) {
    console.error('Error looking up payment:', error);
    throw error;
  }
}

// Add more functions as needed...

module.exports = {
  makePayment,
  cancelPayment,
  lookupPayment,
  // Add more exports as needed...
};