

const stripeKey='pk_test_51OPsDsFS6R1zQGI27xPXIONdeFc3ib6AtfauKa4cauaEVKPGYr7JBqogaO7Sxol9DqmpwaxaAiPJZk2o4GcLcjwi00Ii3g4qJ4'
const stripeSecret='sk_test_51OPsDsFS6R1zQGI2boRAIMdnVSXmNZHixajEjaLaHoHb2XCOOjp2EEYdN87jrEXyNM4HrIQIjZ8NDAvosfsbrCF200bIwvt4dj';

const express = require('express');
const stripe = require('stripe')(stripeSecret);


const payment_method_type = 'us_bank_account'



const paymentIntent =  stripe.paymentIntents.create({
    amount: 1099,
    currency: 'usd',
    payment_method_types: ['us_bank_account'],
  });

  //(async () => {
    const response =  fetch('/secret');
    console.log(response);
    //const {client_secret: clientSecret} =  response.json();
    // Render the form using the clientSecret
//  })();
