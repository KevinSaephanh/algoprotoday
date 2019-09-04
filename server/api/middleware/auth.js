const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("../../config").get(process.env.NODE_ENV);

// Compare candidatePassword with associated user password
const compare = async (candidatePassword, encrypted) => {
    const isMatch = await bcrypt.compare(candidatePassword, encrypted);
    
    if (!isMatch) {
        return "Invalid password!";
    }
};

// Hash password using salt
const hashPassword = async password => {
    const saltRounds = await bcrypt.genSalt(10);
    return bcrypt.hash(password, saltRounds);
};

// Sign token for user login
const generateAuthToken = user => {
    const payload = {
        _id: user._id,
        username: user.username
    };
    const token = jwt.sign(payload, config.SECRET, { expiresIn: "2h" });

    return token;
};

// Verify token for protected routes
const verifyToken = (req, res, next) => {
    // Retrieve authorization header
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
        return res.status(401).send("Access denied!");
    }

    // Validate jwt
    try {
        const decoded = jwt.verify(token, config.SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        return res.status(401).send("Auth failed");
    }
};

module.exports = {
    compare,
    hashPassword,
    generateAuthToken,
    verifyToken
};
