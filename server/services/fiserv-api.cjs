var CryptoJS = require('crypto-js');
const axios = require('axios');

const key = 'XoYFvbSP7M79nrijXydCJBSXy1JsbW8b';
const secret = 'g8GkQUCTJaZk26GQtsNKLT253SPwPN4lSTiMlEcTVPV';


//-------------------------------------------------
//MAKE CREDIT CARD TRANSACTION---------------------
//-------------------------------------------------
function makePayment(price, cardNum, cardExpMonth, cardExpYear){
    const BASE_URL = 'https://cert.api.fiservapps.com/ch/payments/v1/charges';
    const request = {
      "amount":{
        "total":price,
        "currency":"USD"
      },
      "source":{
        "sourceType":"PaymentCard",

        "card":{
          "cardData":cardNum,
          "expirationMonth":cardExpMonth,
          "expirationYear":cardExpYear
        }
      },
      "transactionDetails":{
        "captureFlag" : true
      },
      "merchantDetails":{
        "merchantId":"100008000003683",
        "terminalId":"10000001"
      }
    };

    var requestBody = JSON.stringify(request)
    var ClientRequestId = Math.floor((Math.random() * 10000000) + 1);
    var time = new Date().getTime();
    var rawSignature = key + ClientRequestId + time + requestBody;
    var computedHash = CryptoJS.algo.HMAC.create(CryptoJS.algo.SHA256, secret.toString());
    computedHash.update(rawSignature);
    computedHash = computedHash.finalize();
    var computedHmac = b64encode(computedHash.toString());

    const headers = {
      'Content-Type': 'application/json',
      'Client-Request-Id': ClientRequestId, 
      'Api-Key': key,  // Include your actual API key here
      'Timestamp': time,
      'Auth-Token-Type': 'HMAC',
      'Authorization': computedHmac
      };

    axios.post(BASE_URL, requestBody, { headers })
    .then(response => console.log(response.data))
    .catch(error => console.error("Error making payment: ", error.response.data));
}

//-------------------------------------------------
//MAKE ACH TRANSACTION-----------------------------
//-------------------------------------------------
function makeACHPayment(){
  
}

//-------------------------------------------------
//MAKE CHECK TRANSACTION--------------------------
//-------------------------------------------------
function makeCheckPayment(){
  
}


//-------------------------------------------------
//MAKE APPLE PAY TRANSACTION-----------------------
//-------------------------------------------------
function makeApplePayment (){

}


//-------------------------------------------------
//GET PAYMENT INFORMATION--------------------------
//-------------------------------------------------
function getPayment(transactionId){
    const BASE_URL = 'https://cert.api.fiservapps.com/ch//payments/v1/transaction-inquiry';
    
    const request = {
      "referenceTransactionDetails" : {
        "referenceTransactionId" : transactionId
      }, 
      "merchantDetails" : {
        "merchantId" : "100008000003683"
      }
    }
    
    var requestBody = JSON.stringify(request)
    var ClientRequestId = Math.floor((Math.random() * 10000000) + 1);
    var time = new Date().getTime();
    var rawSignature = key + ClientRequestId + time + requestBody;
    var computedHash = CryptoJS.algo.HMAC.create(CryptoJS.algo.SHA256, secret.toString());
    computedHash.update(rawSignature);
    computedHash = computedHash.finalize();
    var computedHmac = b64encode(computedHash.toString());

    const headers = {
      'Content-Type': 'application/json',
      'Client-Request-Id': ClientRequestId, 
      'Api-Key': key,  // Include your actual API key here
      'Timestamp': time,
      'Auth-Token-Type': 'HMAC',
      'Authorization': computedHmac
      };
    
    axios.post(BASE_URL, requestBody, { headers })
      .then(response => console.log(response.data[0]))
      .catch(error => console.error("Error making payment: ", error.response.data));
}


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


//Mock Data - makePayment
const cardNum = "4005550000000029"
const price = 123123.00
const cardExpMonth = "01"
const cardExpYear = "2035"
makePayment(price, cardNum, cardExpMonth, cardExpYear);

//Mock Data - getPayment
const transactionId = "f2ad8e0a7b7a4e13b0c25621f890cf2a";
//getPayment(transactionId);

//Mock Data - makeApplePayment
//makeApplePayment();
