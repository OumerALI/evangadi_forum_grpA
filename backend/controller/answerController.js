const dbConection = require("../db/dbConfig");
const { StatusCodes } = require("http-status-codes");

async function getAnswer(req,res) {

  const questionid = req.params.questionid;
  
    try {
      const [answers] = await dbConection.query(
        "SELECT a.answerid, a.answer, u.username, a.created_at FROM answers a JOIN users u ON a.userid = u.userid WHERE a.questionid =?",
        [questionid]
      );
      // console.log(answers);

      if (answers.length == 0) {
        return res
          .status(StatusCodes.NOT_FOUND)
          .json({ msg: "No answers found." });
      }

      return res.status(StatusCodes.OK).json({ answers: answers });

    } catch (error) {
      console.log(error.message);
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ msg: "An unexpected error occurred." });
    }
}

async function postAnswer(req,res) {

    const { answer, questionid } = req.body;

    if (!answer) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ msg: "Please provide answer" });
    }
    try {

      const userid = req.user.userid;

      await dbConection.query(
        "INSERT INTO answers (userid,questionid,answer) VALUES (?,?,?)",
        [userid, questionid, answer]
      );

      return res
        .status(StatusCodes.CREATED)
        .json({ msg: "Answer posted successfully" });

    } catch (error) {

      console.log(error.message);

      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ msg: "An unexpected error occurred." });
    }
}

const editAnswer = async (req, res) => {
  const { answerid } = req.params; // The ID of the answer to be edited
  const { answer } = req.body; // The new answer text

  // Check if the answer is provided and if answerid exists
  if (!answer || !answerid) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: "Please provide updated answer." });
  }

  const { userid } = req.user; // Destructure the userid from the request object (set by auth middleware)

  try {
    // Check if the answer exists in the database
    const [existingAnswer] = await dbConection.query(
      "SELECT * FROM answers WHERE answerid = ?",
      [answerid]
    );

    // Handle appending the updated timestamp to the answer
    let updatedAnswer = answer;
    updatedAnswer = `${updatedAnswer} (Updated on ${new Date().toISOString()})`;

    // Update the answer in the database
    await dbConection.query(
      "UPDATE answers SET answer = ? WHERE answerid = ?",
      [updatedAnswer, answerid]
    );

    return res
      .status(StatusCodes.OK)
      .json({
        msg: "Answer updated successfully.",
        updated_answer: updatedAnswer,
      });
  } catch (error) {
    console.log(error.message);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "Something went wrong, please try again later" });
  }
};

module.exports = { getAnswer, postAnswer, editAnswer };