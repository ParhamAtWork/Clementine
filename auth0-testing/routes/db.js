var express = require("express");
var router = express.Router();
const { requiresAuth } =require('express-openid-connect') // use this to enforce authentication on routing
const axois = require('axios')

router.get("/", (req, res) => {
  console.log(req.oidc.isAuthenticated());
  res.render("index", {
    title: "express demo",
    isAuthenticated: req.oidc.isAuthenticated(),
    user: req.oidc.user,
  });
});

router.get("/secured", requiresAuth(), async (req, res) => {
  let data = {}

  try {
    const apiResponse = await axios.get('http://localhost:5000/public')
    data = apiResponse.data
  } catch(e) {

  }
  console.log(req.oidc.isAuthenticated());
  res.render("secured", {
    title: "Secure Page",
    isAuthenticated: req.oidc.isAuthenticated(),
    user: req.oidc.user,
    data
  });
});

module.exports = router;
