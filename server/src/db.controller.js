import express from 'express';

const app = express();

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