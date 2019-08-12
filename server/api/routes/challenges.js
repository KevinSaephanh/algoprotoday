const router = require("express").Router();
const Challenge = require("../models/Challenge");
const { verifyToken } = require("../middleware/auth");

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
router.post("/:id", async (req, res) => {
 

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
router.delete("/:id", async (req, res) => {
  try {
    await Challenge.findOneAndDelete({ _id: req.params.id });
    res.status(200).send("Deletion successful");
  } catch (error) {
    res.status(400).send("Failed to delete challenge");
  }
});

module.exports = router;
