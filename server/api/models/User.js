const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        minlength: 5,
        maxlength: 15,
        required: true
    },
    email: {
        type: String,
        unique: true,
        minlength: 7,
        maxlength: 50,
        required: true
    },
    password: {
        type: String,
        minlength: 7,
        maxlength: 255,
        required: true
    },
    bio: {
        type: String,
        maxlength: 300
    },
    website: {
        type: String,
        maxlength: 100
    },
    github: {
        type: String,
        maxlength: 100
    },
    linkedin: {
        type: String,
        maxlength: 100
    },
    date: {
        type: Date,
        default: Date.now
    },
    isVerified: {
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model("User", UserSchema);
