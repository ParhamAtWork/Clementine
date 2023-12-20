import React from 'react';

function PaymentSelection({ selectedPayment, onPaymentChange }) {    
    const paymentMethods = ['Credit/Debit', 'ACH Transfer/eCheck', 'Digital Wallet'];

    return (
      <div>
        <label htmlFor="paymentMethod">Select Payment Method:</label>
        <select
          id="paymentMethod"
          value={selectedPayment}
          onChange={(e) => onPaymentChange(e.target.value)}
        >
          {paymentMethods.map((method) => (
            <option key={method} value={method}>
              {method}
            </option>
          ))}
        </select>
      </div>
    );
  }
  
  export default PaymentSelection;