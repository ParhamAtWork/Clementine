import express from 'express';
 
// create an Express app
const app = express();
const PORT = 8000; // Change the port to a different value
 

// making server listen to request
app.listen(PORT, () => {
  console.log(`Server running at : http://localhost:${PORT}/`);
});