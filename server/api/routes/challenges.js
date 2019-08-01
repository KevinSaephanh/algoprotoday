const router = require("express").Router();
const Challenge = require("../models/Challenge");
const { challengeValidation } = require("../middleware/validation");
const { verifyToken } = require("../middleware/auth");

// GET ALL CHALLENGES
router.get("/", async (req, res) => {
  try {
    const challenges = await Challenge.find();
    return res.status(200).send(challenges);
  } catch (error) {
    res.status(400).send("No challenges found");
  }
});

// GET A SPECIFIC CHALLENGE
router.get("/:id", verifyToken, async (req, res) => {
  try {
    const challenge = await Challenge.findById(req.params.id);
    return res.status(200).send(challenge);
  } catch (error) {
    return res.status(400).send("Challenge could not be found");
  }
});

// CREATE A CHALLENGE
router.post("/create", async (req, res) => {
  // Validate data
  const { error } = challengeValidation(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  const challenge = new Challenge(req.body);

  try {
    await challenge.save();
    return res.status(200).send("Successfully created challenge");
  } catch (error) {
    return res.status(400).send(error);
  }
});

// UPDATE A CHALLENGE
router.post("/:id", async (req, res) => {
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
      solutions: req.body.solutions
    });
    return res.status(200).send("Challenge successfully updated");
  } catch (error) {
    return res.status(400).send("Unsuccessful update");
  }
});

// DELETE A CHALLENGE
router.delete("/:id", async (req, res) => {
  try {
    await Challenge.findOneAndDelete({ _id: req.params.id });
    return res.status(200).send("Deletion successful");
  } catch (error) {
    return res.status(400).send("Failed to delete challenge");
  }
});

module.exports = router;
