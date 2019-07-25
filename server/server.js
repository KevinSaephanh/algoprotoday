const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const db = require("./config");
const Auth = require("./api/routes/auth");
const Challenge = require("./api/routes/challenges");
const app = express();

mongoose
  .connect(db.mongoDev, { useNewUrlParser: true, useCreateIndex: true })
  .then(() => console.log("MongoDB connection successful"))
  .catch(err => console.log(err));

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api", Auth);
app.use("/api/challenge", Challenge);

app.listen(db.PORT, () => console.log("Server started on port " + db.PORT));

module.exports = app;
