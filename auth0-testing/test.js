var express = require("express")
var indexRouter = require('./routes/db.js')
const { auth } = require('express-openid-connect');
require('dotenv').config()

const config = {
  authRequired: false,
  auth0Logout: true,
  secret: process.env.SECRET,
  baseURL: process.env.BASEURL,
  clientID: process.env.CLIENTID,
  issuerBaseURL: process.env.ISSUER,
};

var app = express()
app.set('views', 'views')
app.set('view engine', 'ejs')
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static('../client/public')) // handle b4 routes are defined any static files that want to be served
console.log('Issuer URL:', process.env.ISSUER);
app.use(auth(config));


app.use('/', indexRouter)

app.listen(3000, () => {
    console.log('Express is running on port 3000')
})