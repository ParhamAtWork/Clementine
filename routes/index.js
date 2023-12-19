import express from 'express';
import { createConnection } from 'mysql';
import fs from 'fs';

const sql = fs.readFileSync('./data.sql').toString();
const app = express();
const PORT = 8000;

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

con.connect(function (err) {
  if (err) throw err;
  console.log('Connected!');

  
  // con.query(sql, function (err, result) {
  //   if (err) throw err;
  //   console.log('Database and table created');
  // });
 
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