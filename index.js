import express from 'express';
import { createConnection } from 'mysql';
 
// create an Express app
const app = express();
const PORT = 8000; // Change the port to a different value
 

// making server listen to request
app.listen(PORT, () => {
  console.log(`Server running at : http://localhost:${PORT}/`);
});

const connection = createConnection({
  host: 'localhost',
  port: 3306,
  database: 'clementine',
  user: 'root',
  password: ''
});
 
connection.connect((error) => {
  if (error) {
    console.error('Error connecting to MySQL database:', error);
  }
});

// creating route for the app
app.get('/Users', (req, res) => {
  connection.query('SELECT * FROM Users', function (err, rows) {
    if (!err) {
      res.send(JSON.stringify(rows));
    } else {
      console.error('Error while performing Query:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
});