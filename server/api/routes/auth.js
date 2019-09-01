const router = require("express").Router();
const User = require("../models/User");
const { validateRegister, validateLogin } = require("../middleware/validation");
const {
    compare,
    hashPassword,
    generateAuthToken,
    verifyToken
} = require("../middleware/auth");
const nodemailer = require("nodemailer");
const config = require("../../config").get(process.env.NODE_ENV);

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
        //res.status(200).json("New user added successfully");

        const transporter = nodemailer.createTransport({
            service: "Sendgrid",
            auth: config.MAIL_USER,
            pass: config.MAIL_PASS
        });
        const mailOptions = {
            from: "algoprotoday@gmail.com",
            to: newUser.email,
            subject: "Account Verification",
            text: `Hello ${newUser.username}, \n\n Please verify your account by clicking the link: \nhttp://${config.HOST_URL}/verification/${newUser._id}`
        };

        await transporter.sendMail(mailOptions);
        // res.status(200).json(
        //     `A verificaiton email has been sent to ${newUser.username}`
        // );
    } catch (err) {
        res.status(400).json(err);
    }
});

// Email Verificaiton
router.post("/verification/:id", async (req, res) => {
    const { id } = req.params;

    try {
        const user = await User.findById(id);
        await user.update({ isVerified: true });
        res.status(200).json("User is now verified");
    } catch (err) {
        res.status(400).json("Could not verify user");
    }
});

// Resending Verification Email
router.post("/resend/:id", async (req, res) => {
    const { id } = req.params;

    try {
        const user = await User.findById(id);
        if (user.isVerified) {
            res.status(200).json("User is already verified");
        } else {
            const transporter = nodemailer.createTransport({
                service: "Sendgrid",
                auth: config.MAIL_USER,
                pass: config.MAIL_PASS
            });
            const mailOptions = {
                from: "algoprotoday@gmail.com",
                to: user.email,
                subject: "Account Verification",
                text: `Hello ${user.username}, \n\n Please verify your account by clicking the link: \nhttp://${config.HOST_URL}/verification/${user._id}`
            };

            await transporter.sendMail(mailOptions);
            res.status(200).json(
                `A verificaiton email has been sent to ${user.username}`
            );
        }
    } catch (err) {
        res.status(400).json("Could not verify user");
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

        // Check if user is unverified
        if (!user.isVerified) {
            res.status(400).json("User is not verified");
        }

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
router.post("/:id", verifyToken, async (req, res) => {
    const { username, email, bio, website, github, linkedin } = req.body;

    try {
        const user = {
            username,
            email: email.toLowerCase(),
            bio,
            website: website.toLowerCase(),
            github: github.toLowerCase(),
            linkedin: linkedin.toLowerCase()
        };
        await User.findByIdAndUpdate(req.params.id, user);
        res.status(200).json("User successfully updated");
    } catch (err) {
        res.status(400).json("Failed to update");
    }
});

// DELETE
router.get("/:id", verifyToken, async (req, res) => {
    try {
        await User.findByIdAndRemove(req.params.id);
        res.status(200).json("User successfully deleted");
    } catch (err) {
        res.status(400).json(err);
    }
});

module.exports = router;
