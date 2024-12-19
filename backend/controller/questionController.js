/** @format */

const dbConection = require("../db/dbConfig");
const { StatusCodes } = require("http-status-codes");

async function ask(req, res) {
  const { title, description } = req.body;

  if (!title || !description) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: "please provide all the required informations" });
  }
  try {
    const userid = req.user.userid;

    await dbConection.query(
      "INSERT INTO questions (questionid,userid,title,description) VALUES (UUID(),?,?,?)",
      [userid, title, description]
    );

    return res
      .status(StatusCodes.CREATED)
      .json({ msg: "Question created successfully" });
  } catch (error) {
    console.log(error.message);

    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "An unexpected error occurred." });
  }
}

async function getAllQuestions(req, res) {
  try {
    const [questions] = await dbConection.query(
      "SELECT q.questionid, q.title, q.description, u.username, q.created_at FROM questions q JOIN users u ON q.userid = u.userid ORDER BY q.id DESC"
    );
    // console.log(questions);

    if (questions.length == 0) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ msg: "No questions found." });
    }
    return res.status(StatusCodes.OK).json({ questions: questions });
  } catch (error) {
    console.log(error.message);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "An unexpected error occurred." });
  }
}

async function getSingleQuestion(req, res) {
  const questionId = req.params.questionid;

  try {
    const [[question]] = await dbConection.query(
      "SELECT * FROM questions WHERE questionid=?",
      [questionId]
    );

    if (!question) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ error: "Question not found" });
    }

    return res.status(StatusCodes.OK).json({ question });
  } catch (error) {
    console.log(error.message);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "An unexpected error occurred." });
  }
}

module.exports = { ask, getAllQuestions, getSingleQuestion };
