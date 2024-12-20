const express = require("express");

const router = express.Router();

// question controller
const {
  ask,
  getAllQuestions,
  getSingleQuestion,
} = require("../controller/questionController");

// user ask router
router.post("/ask", ask);

// all questions router
router.get("/all-questions", getAllQuestions);

// single question router
router.get("/:questionid", getSingleQuestion);

module.exports = router;
