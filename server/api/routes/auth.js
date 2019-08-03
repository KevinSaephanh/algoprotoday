const router = require("express").Router();
const User = require("../models/User");
const {
  registerValidation,
  loginValidation
} = require("../middleware/validation");
const {
  compare,
  hashPassword,
  generateAuthToken
} = require("../middleware/auth");

// REGISTER
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
  const hashedPassword = await hashPassword(password);

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

// LOGIN
router.post("/login", async (req, res) => {
  // Validate data
  const { error } = loginValidation(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  // Find username and password
  let user;
  try {
    user = await User.findOne({
      username: new RegExp("\\b" + req.body.username + "\\b", "i")
    });
    await compare(req.body.password, user.password);
  } catch (error) {
    return res.status(400).send({ error: "Username/password is incorrect" });
  }

  // Sign token
  const token = generateAuthToken(user);
  res.header("auth-token", token).send({
    id: user._id,
    username: user.username,
    token: token
  });
});

// GET USERS
router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    return res.status(200).send(users);
  } catch (error) {
    return res.status(400).send("No users found");
  }
});

// GET SPECIFIC USER
router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.status(200).send(user);
  } catch (error) {
    return res.status(400).send("User could not be found");
  }
});

// UPDATE
router.post("/:id", async (req, res) => {
  // Validate data
  const { error } = registerValidation(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  const username = req.body.username;
  const email = req.body.email.toLowerCase();
  const password = req.body.password;

  // Hash password
  const hashedPassword = await hashPassword(password);

  try {
    await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          username: username,
          email: email,
          password: hashedPassword
        }
      },
      { new: true }
    );
    return res.status(200).send("User successfully updated");
  } catch (err) {
    return res.status(400).send("Failed to update");
  }
});

// DELETE
router.get("/:id", async (req, res) => {
  try {
    await User.findByIdAndRemove(req.params.id);
    return res.status(200).send("User successfully deleted");
  } catch (err) {
    return res.status(400).send(err);
  }
});

module.exports = router;
