const express = require("express");
const router = express.Router();

// question controller
const {
  getAnswer,
  postAnswer,
  editAnswer,
} = require("../controller/answerController");

// user get answer router
router.get("/answer/:questionid", getAnswer);

// user post answer router
router.post("/answer", postAnswer);

// Route to edit an answer that was submitted by a user ; PUT can handle both full and partial updates and is a more standard method for updating resources
router.put("/edit-answer/:answerid", editAnswer);

module.exports = router;
