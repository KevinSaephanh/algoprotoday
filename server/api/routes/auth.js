const express = require("express");
const User = require("../models/User");
const { registerValidation, loginValidation } = require("./validation");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const config = require("../../config");
const router = express.Router();

router.post("/register", async (req, res) => {
  // Validate data
  const { error } = registerValidation(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  const username = req.body.username;
  const email = req.body.email.toLowerCase();
  const password = req.body.password;

  // Check for duplicate username
  const usernameExists = await User.findOne({ username: username });
  if (usernameExists) {
    return res.status(400).send("Username is already in use");
  }

  // Check for duplicate email
  const emailExists = await User.findOne({ email: email });
  if (emailExists) {
    return res.status(400).send("Email is already in use");
  }

  // Hash password
  const saltRounds = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, saltRounds);

  // Create and save new user
  const newUser = new User({
    username: username,
    email: email,
    password: hashedPassword
  });

  try {
    await newUser.save();
    res.status(200).send("New user added successfully");
  } catch (err) {
    res.status(400).send(err);
  }
});

router.post("/login", async (req, res) => {
  // Validate data
  const { error } = loginValidation(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  // Find username and password
  let user;
  try {
    user = await User.findOne({ username: req.body.username });
    bcrypt.compare(req.body.password, user.password);
  } catch (error) {
    return res.status(400).send("Username/password is incorrect");
  }

  // Create and assign a token
  const payload = { _id: user._id, username: user.username };
  const token = jwt.sign(payload, config.myprivatekey, {
    expiresIn: "1h"
  });
  user.token = token;

  res.cookie("auth", user.token).send({
    id: user._id,
    username: user.username
  });

  //res.header("auth-token", token).send(token);
});

router.get("/logout", (req, res) => {
  res.clearCookie(req.params.id);

  req.session.destroy(err => {
    res.redirect("/");
  });
});

router.get("/users", async (req, res) => {
  try {
    const users = await User.find();
    return res.status(200).send(users);
  } catch (error) {
    return res.status(400).send("No users found");
  }
});

router.get("/user/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.status(200).send(user);
  } catch (error) {
    return res.status(400).send("User could not be found");
  }
});

router.post("/user/:id", async (req, res) => {
  // Validate data
  const { error } = registerValidation(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  const username = req.body.username;
  const email = req.body.email.toLowerCase();
  const password = req.body.password;

  // Check for duplicate username
  const usernameExists = await User.findOne({ username: username });
  if (usernameExists) {
    return res.status(400).send("Username is already in use");
  }

  // Check for duplicate email
  const emailExists = await User.findOne({ email: email });
  if (emailExists) {
    return res.status(400).send("Email is already in use");
  }

  // Hash password
  const saltRounds = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, saltRounds);

  try {
    await User.findByIdAndUpdate(req.params.id, {
      username: username,
      email: email,
      password: hashedPassword
    });
  } catch (err) {
    return res.status(400).send("Failed to update");
  }
});

module.exports = router;
