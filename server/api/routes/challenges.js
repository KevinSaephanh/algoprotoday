const express = require("express");
const Challenge = require("../models/Challenge");
const challengeValidation = require("./validation");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const challenges = await Challenge.find();
    return res.status(200).send(challenges);
  } catch (error) {
    res.status(400).send("No challenges found");
  }
});

router.get("/:id", async (req, res) => {
  try {
    const challenge = await Challenge.findById(req.params.id);
    return res.status(200).send(challenge);
  } catch (error) {
    return res.status(400).send("Challenge could not be found");
  }
});

router.post("/create", async (req, res) => {
  // Validate data
  const { error } = challengeValidation(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  try {
    const challenge = new Challenge(req.body);
    await challenge.save();
    return res.status(200).send("Successfully created challenge");
  } catch (error) {
    return res.status(400).send("Creation unsuccessful");
  }
});

router.post("/update/:id", async (req, res) => {
  // Validate data
  const { error } = challengeValidation(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  try {
    await Challenge.findByIdAndUpdate(req.params.id, {
      title: req.body.title,
      difficulty: req.body.difficulty,
      prompt: req.body.prompt,
      userAnswers: req.body.userAnswers,
      solutions: req.body.solutions
    });
    return res.status(200).send("Challenge successfully updated");
  } catch (error) {
    return res.status(400).send("Unsuccessful update");
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await Challenge.findOneAndDelete({ _id: req.params.id });
    return res.status(200).send("Deletion successful");
  } catch (error) {
    return res.status(400).send("Failed to delete challenge");
  }
});

module.exports = router;
