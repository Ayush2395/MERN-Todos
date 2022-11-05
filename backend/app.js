const express = require("express");
const todos = require("./routes/todosRoutes");
const app = express();
const port = 8000;
const mongoose = require("mongoose");
const authRoutes = require("./routes/authRoutes");
require("dotenv").config();

/*============middlewares========= */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/*=======MongoDB Atlas Connection======== */
mongoose.connect(
  process.env.MONGO_URI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  app.listen(port, () => console.log(`server running on port ${port}`))
);
const db = mongoose.connection;
db.on("error", () => console.log("error in connecting databse"));
db.once("open", () => console.log("Database connected"));

// routes
app.use("/api/todos", todos);
app.use("/api/auth", authRoutes);
