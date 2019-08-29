const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
const config = require("./config").get(process.env.NODE_ENV);
const app = express();

// Models
const Auth = require("./api/routes/auth");
const Challenge = require("./api/routes/challenges");

// Connect to DB
mongoose
    .connect(config.DATABASE, {
        useNewUrlParser: true,
        useCreateIndex: true
    })
    .then(() => console.log("MongoDB connection successful"))
    .catch(err => console.log(err));

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Use routes
app.use("/api/users", Auth);
app.use("/api/challenges", Challenge);

if (process.env.NODE_ENV === "production") {
    // Set static folder
    app.use(express.static("client/build"));

    app.get("/*", (req, res) => {
        res.sendfile(
            path.resolve(__dirname, "../client", "build", "index.html")
        );
    });
}

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log("Server started on port " + PORT));

module.exports = app;
