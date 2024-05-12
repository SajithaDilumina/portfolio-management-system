const router = require("express").Router();
const Question = require("../models/Question");

router.get("/quiz", async (req, res) => {
  try {
    let randomQuestions = [];
    const maxQuestions = 10;

    while (randomQuestions.length < maxQuestions) {
      const question = await fetchRandomQuestion();
      const questionId = question._id.toString();

      if (!randomQuestions.some((q) => q._id.toString() === questionId)) {
        randomQuestions.push(question);
      }
    }

    res.json(randomQuestions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

async function fetchRandomQuestion() {
  try {
    const count = await Question.countDocuments();
    const randomIndex = Math.floor(Math.random() * count);
    const question = await Question.findOne().skip(randomIndex);
    const { _id, questionText, options, correctOption } = question;
    return { _id, questionText, options, correctOption };
  } catch (error) {
    console.error("Error fetching random question", error);
    throw new Error("Error fetching random question");
  }
}

router.route("/add").post((req, res) => {
  try {
    const { questionText, options, correctOption } = req.body;

    const question = new Question({
      questionText,
      options,
      correctOption,
    });

    question.save();

    res.status(201).json({ message: "Question created successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

router.route("/").get((req, res) => {
  Question.find()
    .then((questions) => {
      res.json(questions);
    })
    .catch((err) => {
      console.log(err);
    });
});

router.get("/:id", (req, res) => {
  const id = req.params.id;
  Question.findById(id)
    .then((question) => {
      if (!question) {
        return res.status(404).json({ message: "Question not found" });
      }
      res.json(question);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ message: "Server Error" });
    });
});

router.put("/update/:id", (req, res) => {
  const id = req.params.id;
  const { questionText, options, correctOption } = req.body;

  Question.findByIdAndUpdate(
    id,
    { questionText, options, correctOption },
    { new: true }
  )
    .then((updatedQuestion) => {
      if (!updatedQuestion) {
        return res.status(404).json({ message: "Question not found" });
      }
      res.json({
        message: "Question updated successfully",
        question: updatedQuestion,
      });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ message: "Server Error" });
    });
});

router.delete("/delete/:id", (req, res) => {
  const id = req.params.id;
  Question.findByIdAndDelete(id)
    .then((question) => {
      if (!question) {
        return res.status(404).json({ message: "Question not found" });
      }
      res.status(200).json({ message: "Question deleted successfully" });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ message: "server error" });
    });
});

module.exports = router;
