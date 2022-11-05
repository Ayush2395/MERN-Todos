const { login_user, signup_user } = require("../controller/authController");

const auth = require("express").Router();

/*============login route========= */
auth.post("/login", login_user);

/*==========signup route========== */
auth.post("/signup", signup_user);

module.exports = auth;
