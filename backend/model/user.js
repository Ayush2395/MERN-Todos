const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const validator = require("validator");
const bcrypt = require("bcrypt");

const userSchema = new Schema({
  email: {
    type: String,
    required: [true, "Please enter your email"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Please enter your password"],
    minlength: [6, "password must me minimum of 6 words"],
  },
});

userSchema.statics.signup = async function (email, password) {
  const isEmail = await this.findOne({ email });

  if (!email || !password) throw Error("All feilds are reqiured");

  if (!validator.default.isEmail(email)) throw Error("Not a valid Email");

  if (!validator.default.isStrongPassword(password))
    throw Error("Weak Password");

  if (isEmail) {
    throw Error("Email already registered");
  }

  const salt = await bcrypt.genSalt();
  const hash = await bcrypt.hash(password, salt);

  const user = await this.create({ email, password: hash });

  return user;
};

userSchema.statics.login = async function (email, password) {
  const user = await this.findOne({ email });

  if (!email || !password) throw Error("All fields are required");

  if (!user) {
    throw Error("user not registered");
  }

  const match = await bcrypt.compare(password, user.password);

  if (!match) throw Error("Password does not match");

  return user;
};

module.exports = mongoose.model("user", userSchema);
