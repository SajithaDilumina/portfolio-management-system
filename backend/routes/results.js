const express = require("express");
const router = express.Router();
const Result = require("../models/Result");

// Endpoint to save results data
// router.post("/", async (req, res) => {
//   try {
//     const { correctAnswers, milliseconds,userId } = req.body;

//     // Convert milliseconds to seconds
//     const totalSeconds = Math.floor(milliseconds / 1000);

//     // Create a new result entry
//     const result = new Result({
//       userId: userId,
//       correctAnswers,
//       timeTaken: totalSeconds,
//     });

//     // Save the result to the database
//     await result.save();

//     res.status(201).json({ message: "Result saved successfully" });
//   } catch (error) {
//     console.error("Error saving result:", error);
//     res.status(500).json({ message: "Internal server error" });
//   }
// });

router.post("/", async (req, res) => {
  try {
    const { correctAnswers, milliseconds, userId } = req.body;
    const totalSeconds = Math.floor(milliseconds / 1000);

    const existingResult = await Result.findOne({ UserID: userId });

    if (existingResult) {
      if (correctAnswers > existingResult.correctAnswers) {
        existingResult.correctAnswers = correctAnswers;
        existingResult.timeTaken = totalSeconds; 
        await existingResult.save();
        res.status(200).json({ message: "Result updated successfully" });
      } else {
        res.status(200).json({ message: "Result not updated, existing score is higher or equal" });
      }
    } else {
      const result = new Result({
        UserID: userId,
        correctAnswers,
        timeTaken: totalSeconds,
      });
      await result.save();
      res.status(201).json({ message: "Result saved successfully" });
    }
  } catch (error) {
    console.error("Error saving or updating result:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.get("/scores", async (req, res) => {
  try {
    // Retrieve all results from the database and populate user details
    const results = await Result.find().populate({
      path: 'UserID',  // Ensure this matches the schema definition
      select: 'fullName' // Only fetch the fullName from User model
    });

    // Sort the results based on correct answers (descending) and time taken (ascending)
    results.sort((a, b) => {
      if (a.correctAnswers !== b.correctAnswers) {
        return b.correctAnswers - a.correctAnswers;
      } else {
        return a.timeTaken - b.timeTaken;
      }
    });

    // Send the sorted results to the frontend
    res.status(200).json(results.map(result => ({
      correctAnswers: result.correctAnswers,
      timeTaken: result.timeTaken,
      userName: result.UserID ? result.UserID.fullName : "No user", // Checking if UserID exists
    })));
  } catch (error) {
    console.error("Error fetching scores:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});


router.get("/check-pass/:userId", async (req, res) => {
  try {
    const userId = req.params.userId; 
    const result = await Result.findOne({ UserID: userId });

    if (result) {
      // Return true if correctAnswers is greater than 7, otherwise false
      const hasPassed = result.correctAnswers >= 7;
      res.status(200).json({ hasPassed: hasPassed });
    } else {
      res.status(200).json({ message: "No result found for user", hasPassed: false });
    }
  } catch (error) {
    console.error("Error fetching user result:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
