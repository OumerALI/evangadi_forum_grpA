const express = require("express");

const router = express.Router();

// question controller
const {
  ask,
  getAllQuestions,
  getSingleQuestion,
  editQuestion,
} = require("../controller/questionController");

// user ask router
router.post("/ask", ask);

// all questions router
router.get("/all-questions", getAllQuestions);

// single question router
router.get("/:questionid", getSingleQuestion);

// question edit route
router.put("/edit-question/:questionid", editQuestion);

module.exports = router;
