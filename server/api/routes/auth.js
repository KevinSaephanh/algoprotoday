const router = require("express").Router();
const User = require("../models/User");
const { validateRegister, validateLogin } = require("../middleware/validation");
const {
  compare,
  hashPassword,
  generateAuthToken,
  verifyToken
} = require("../middleware/auth");

// router.get("/auth", verifyToken, (req, res) => {
//   res.json({
//     isAuthenticated: true,
//     id: req.user._id,
//     username: req.user.username
//   });
// });

// REGISTER
router.post("/register", async (req, res) => {
  // Validate data
  const { errors, isValid } = validateRegister(req.body);

  if (!isValid) {
    res.status(400).json(errors);
  }

  const { username, email, password } = req.body;

  // Check for duplicate username
  const usernameExists = await User.findOne({ username: username });
  if (usernameExists) {
    res.status(400).json("Username is already in use");
  }

  // Check for duplicate email
  const emailExists = await User.findOne({ email: email.toLowerCase() });
  if (emailExists) {
    res.status(400).json("Email is already in use");
  }

  // Hash password
  const hashedPassword = await hashPassword(password);

  // Create and save new user
  const newUser = new User({
    username: username,
    email: email.toLowerCase(),
    password: hashedPassword
  });

  try {
    await newUser.save();
    res.status(200).json("New user added successfully");
  } catch (err) {
    res.status(400).json(err);
  }
});

// LOGIN
router.post("/login", async (req, res) => {
  // Validate data
  const { errors, isValid } = validateLogin(req.body);

  if (!isValid) {
    res.status(400).json(errors);
  }

  // Find username and password
  let user;
  try {
    const { username, password } = req.body;
    user = await User.findOne({
      username: new RegExp("\\b" + username + "\\b", "i")
    });
    await compare(password, user.password);
  } catch (error) {
    res.status(400).json("Username/password is incorrect");
  }

  // Sign token
  const token = generateAuthToken(user);
  res.json({
    token: "Bearer " + token
  });
});

// GET USERS
router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    return res.status(200).json(users);
  } catch (error) {
    return res.status(400).json("No users found");
  }
});

// GET SPECIFIC USER
router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json("User could not be found");
  }
});

// UPDATE
router.post("/:id", async (req, res) => {
  // Validate data
  const { error } = registerValidation(req.body);
  if (error) {
    res.status(400).json(error.details[0].message);
  }

  const { username, email, password } = req.body;

  // Hash password
  const hashedPassword = await hashPassword(password);

  try {
    await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          username: username,
          email: email.toLowerCase(),
          password: hashedPassword
        }
      },
      { new: true }
    );
    res.status(200).json("User successfully updated");
  } catch (err) {
    res.status(400).json("Failed to update");
  }
});

// DELETE
router.get("/:id", async (req, res) => {
  try {
    await User.findByIdAndRemove(req.params.id);
    res.status(200).json("User successfully deleted");
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
