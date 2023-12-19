import express from 'express';
import { createConnection } from 'mysql';
import fs from 'fs';
import { auth, requiredScopes } from "express-oauth2-jwt-bearer";
import axios from 'axios';

const sql = fs.readFileSync('./data.sql').toString();
const app = express();
const PORT = 8000;

// authorization from auth0
const jwtCheck = auth({
  audience: 'http:localhost:3010/api/private',
  issuerBaseURL: 'https://dev-wyvx8c2jswjwvuxo.us.auth0.com/',
  tokenSigningAlg: 'RS256'
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
      client_secret: 'NmgmuHgNNNM-NOoZVPMYgMNWxpbPyRss-hfqwRXAUvus9-dHawn5sXbjp9vsNxl8',
      audience: 'http:localhost:3010/api/private',
      grant_type: 'client_credentials',
    },
  };
  
  axios(options)
    .then(response => {
      console.log(response.data);
    })
    .catch(error => {
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
  // database: 'proof',
  // ***************

  multipleStatements: true,
});

// logs successful connection && has query to initialize DB if not already initialized
con.connect(function (err) {
  if (err) throw err;
  console.log('Connected!');

  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log('Database and table created');
  });

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