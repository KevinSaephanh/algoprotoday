const router = require("express").Router();
const Challenge = require("../models/Challenge");
const { verifyToken } = require("../middleware/auth");
const fetch = require("node-fetch");

// GET ALL CHALLENGES
router.get("/", async (req, res) => {
    try {
        const challenges = await Challenge.find();
        res.status(200).send(challenges);
    } catch (error) {
        res.status(400).send("No challenges found");
    }
});

// GET A SPECIFIC CHALLENGE
router.get("/:id", verifyToken, async (req, res) => {
    try {
        const challenge = await Challenge.findById(req.params.id);
        res.status(200).send(challenge);
    } catch (error) {
        res.status(400).send("Challenge could not be found");
    }
});

// CREATE A CHALLENGE
router.post("/create", async (req, res) => {
    const challenge = new Challenge(req.body);

    const duplicate = await Challenge.findOne({ title: challenge.title });
    if (duplicate) {
        res.status(400).send("Challenge title is already taken");
    }

    try {
        await challenge.save();
        res.status(200).send("Successfully created challenge");
    } catch (error) {
        res.status(400).send(error);
    }
});

// UPDATE A CHALLENGE
router.post("/:id", verifyToken, async (req, res) => {
    try {
        const { title, difficulty, prompt, solutions } = req.body;
        await Challenge.findByIdAndUpdate(req.params.id, {
            title: title,
            difficulty: difficulty,
            prompt: prompt,
            solutions: solutions
        });
        res.status(200).send("Challenge successfully updated");
    } catch (error) {
        res.status(400).send("Unsuccessful update");
    }
});

// DELETE A CHALLENGE
router.delete("/:id", verifyToken, async (req, res) => {
    try {
        await Challenge.findOneAndDelete({ _id: req.params.id });
        res.status(200).send("Deletion successful");
    } catch (error) {
        res.status(400).send("Failed to delete challenge");
    }
});

// COMPILE CODE SENT FROM CLIENT
router.post("/:id/compile", verifyToken, async (req, res) => {
    try {
        const program = {
            script: `${req.body.script}`,
            language: `${req.body.language}`,
            versionIndex: "0",
            clientId: "77bf3efaf1820ddc7ea97f6e8af4add8",
            clientSecret:
                "f4b908a5982bf543e85c59e59118742783467049ac54b32ee1f29b899cffefa4"
        };
        const response = await fetch("https://api.jdoodle.com/v1/execute", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(program)
        });
        const data = await response.json();
        res.status(200).send(data);
    } catch (err) {
        console.log(err);
        res.status(400).send("Invalid request");
    }
});

module.exports = router;
