const router = require("express").Router();
const User = require("../models/User");
const { validateRegister, validateLogin } = require("../middleware/validation");
const {
    compare,
    hashPassword,
    generateAuthToken,
    verifyToken
} = require("../middleware/auth");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const config = require("../../config");

// REGISTER
router.post("/register", async (req, res) => {
    // Validate data
    const { errors, isValid } = validateRegister(req.body);
    if (!isValid) {
        return res.status(400).json(errors);
    }

    const { username, email, password } = req.body;

    //Check for duplicate username
    const usernameExists = await User.findOne({ username: username });
    if (usernameExists) {
        return res.status(400).json("Username is already in use");
    }

    // Check for duplicate email
    const emailExists = await User.findOne({ email: email.toLowerCase() });
    if (emailExists) {
        return res.status(400).json("Email is already in use");
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

        // Generate token for email verification
        const token = jwt.sign(
            { id: newUser._id },
            process.env.SECRET || config.SECRET,
            {
                expiresIn: "1d"
            }
        );
        const url = `http://localhost:3000/verification/${token}`;

        // Email transporter
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.MAIL_USER || config.MAIL_USER,
                pass: process.env.MAIL_PASS || config.MAIL_PASS
            }
        });

        // Email form
        const mailOptions = {
            from: "algoprotoday@gmail.com",
            to: newUser.email,
            subject: "Account Verification",
            text: `Hello ${newUser.username}, \n\nPlease verify your account by clicking the link below:\n${url}`
        };

        await transporter.sendMail(mailOptions);
        res.status(200).json(
            `A verificaiton email has been sent to ${newUser.email}`
        );
    } catch (err) {
        res.status(400).json(`Failed to send email to ${newUser.email}`);
    }
});

// Email Verificaiton
router.post("/verification/:token", async (req, res) => {
    try {
        const decoded = jwt.verify(req.params.token, config.SECRET);
        await User.findOneAndUpdate(
            { _id: decoded.id },
            {
                $set: { isVerified: true }
            }
        );
        res.status(200).json("Congratulations! You are now a verified user!");
    } catch (err) {
        res.status(400).json("I'm sorry we could not verify your account");
    }
});

// Resend Verification Email
router.post("/resend_email/:email", async (req, res) => {
    const { email } = req.params;

    try {
        const user = await User.findOne({ email: email.toLowerCase() });

        // Check if user is already verified
        if (user.isVerified) {
            res.status(400).json("User is already verified");
        } else {
            // Generate token for email verification
            const token = jwt.sign(
                { id: user._id },
                process.env.SECRET || config.SECRET,
                {
                    expiresIn: "1d"
                }
            );
            const url = `http://localhost:3000/verification/${token}`;
            //Create transporter
            const transporter = nodemailer.createTransport({
                service: "gmail",
                auth: {
                    user: process.env.MAIL_USER || config.MAIL_USER,
                    pass: process.env.MAIL_PASS || config.MAIL_PASS
                }
            });
            //Email format
            const mailOptions = {
                from: "algoprotoday@gmail.com",
                to: user.email,
                subject: "Account Verification",
                text: `Hello ${user.username}, \n\n Please verify your account by clicking the link below:\n${url}`
            };
            await transporter.sendMail(mailOptions);
            res.status(200).json(
                `A verificaiton email has been sent to ${user.username}`
            );
        }
    } catch (err) {
        res.status(400).json("Failed to resend a verification email");
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
    try {
        const { username, password } = req.body;
        const user = await User.findOne({
            username: new RegExp("\\b" + username + "\\b", "i")
        });

        // Check if user is verified
        if (user && user.isVerified) {
            await compare(password, user.password);

            // Sign token
            const token = generateAuthToken(user);
            res.json({
                token: "Bearer " + token
            });
        }
    } catch (err) {
        res.status(400).json("Username/password is incorrect");
    }
});

// GET ALL USERS
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

// GET USER BY EMAIL
router.post("/account/:email", async (req, res) => {
    try {
        // Generate new random password
        let password = Math.random()
            .toString(36)
            .substr(7, 10);

        // Set temp password to user
        const { email } = req.params;
        const user = await User.findOneAndUpdate(
            { email: email.toLowerCase() },
            {
                $set: {
                    password
                }
            }
        );

        //Create transporter
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.MAIL_USER || config.MAIL_USER,
                pass: process.env.MAIL_PASS || config.MAIL_PASS
            }
        });

        //Email format
        const mailOptions = {
            from: "algoprotoday@gmail.com",
            to: user.email,
            subject: "Account Information",
            text: `Hello ${user.username}, \n\nHere are your account details: \nUsername: ${user.username} \nNew Password: ${password}`
        };

        await transporter.sendMail(mailOptions);
        res.status(200).json(
            `Your new account details have been sent to the following email: ${user.email}`
        );
    } catch (error) {
        res.status(400).json("User could not be found");
    }
});

// UPDATE AUTH
router.post("/update_auth/:email", async (req, res) => {
    try {
        const { username, email, password, newPassword } = req.body;
        const user = User.findOne({ password });
        if (user) {
            // Hash new password
            const hashedPassword = await hashPassword(newPassword);

            // Update user
            user.update({
                username,
                email: email.toLowerCase(),
                password: hashedPassword
            });
            res.status(200).json("Your account has been updated");
        }
    } catch (err) {
        res.status(400).json("Unable to update your account");
    }
});

// UPDATE PROFILE
router.post("/update_profile/:id", verifyToken, async (req, res) => {
    try {
        const { bio, website, github, linkedin } = req.body;
        const user = {
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
router.delete("/:id", verifyToken, async (req, res) => {
    try {
        await User.findByIdAndRemove(req.params.id);
        res.status(200).json("User successfully deleted");
    } catch (err) {
        res.status(400).json(err);
    }
});

module.exports = router;
