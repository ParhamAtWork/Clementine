import { createConnection } from 'mysql';


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