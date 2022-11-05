const jwt = require("jsonwebtoken");
const user = require("../model/user");

const requireAuth = async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization)
    return res.status(401).json({ error: "authorization must requried" });

  const token = authorization.split(" ")[1];

  try {
    const { _id } = jwt.verify(token, process.env.SECRET);
    req.user = await user.findOne({ _id });
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ error: "unauthorized request" });
  }
};

module.exports = requireAuth;
