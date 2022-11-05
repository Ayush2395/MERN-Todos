const jwt = require("jsonwebtoken");
const User = require("../model/user");

/*==========create json web token========= */
const maxAge = 3 * 24 * 60 * 60;
const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: maxAge });
};

/*=========handle user login======== */
const login_user = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.login(email, password);
    const token = createToken(user._id);
    res.status(200).json({ email, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

/*==========signup user======= */
const signup_user = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.signup(email, password);
    const token = createToken(user._id);
    res.status(200).json({ email, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { login_user, signup_user };
