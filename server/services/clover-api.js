const sdk = require('api')('@clover-platform/v3#3y9az7m36lq0icniw');
const cloverKey="61a4db14de6681b742c5efdd0a2c57f5"
const cloverSecret="2346078b-80fa-b90b-f5ed-6008db847e40"


function tokenize(){
    const url = 'https://token-sandbox.dev.clover.com/v1/tokens'

    header = {
        'apikey':'',
        'accept':'application/json',
        'content-type':'application/json'
    }

    body = {
        "ach": {
        "bank_account_number": "1234567891",
        "bank_routing_number": "123456789",
        "check_type": "personal_check",
        "account_type": "checking",
        "customer_id_type": "driver_license",
        "customer_id_state": "CA",
        "customer_id": "10981111",
        "first_name": "John",
        "last_name": "Doe",
        "address_line1": "1800 Amphibious Blvd",
        "address_city": "Mountain View",
        "address_state": "CA",
        "address_zip": "94045",
        "phone": "0005550001",
        "email": "john.doe@example.com",
        "agreement": {
            "agreement_id": "456",
            "type": "E_CHECK_ICA_PERSONAL_SETTLEMENT",
            "locale": "en_US",
            "template_data": "firstName:John"
        }
    }
}
}

function chargeACH() {
    sdk.createCharge({ ecomind: 'ecom', metadata: { existingDebtIndicator: false } })
        .then(({ data }) => console.log(data))
        .catch(err => console.error(err));
}