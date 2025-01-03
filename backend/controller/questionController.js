const dbConnection = require("../db/dbConfig");
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

    await dbConnection.query(
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
    const [questions] = await dbConnection.query(
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
    const [[question]] = await dbConnection.query(
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

const editQuestion = async (req, res) => {
  const { questionid } = req.params; 
  const { title, description} = req.body; 
  const { userid } = req.user;

  if (!description || !title) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: "Title and Description are required." });
  }

  try {
    // Check if the question exists ------and if the logged-in user is the one who posted it

    const [existingQuestion] = await dbConnection.query(
      "SELECT * FROM questions WHERE questionid = ?",
      [questionid]
    );


    // Handle Title Change: Append "_Updated_at [timestamp]" if the title changes
    let updatedTitle = title;
    if (title !== existingQuestion[0].title) {
      updatedTitle = `${title} (Updated_at_${new Date().toISOString()})`;
    } else {
      updatedTitle = `${title} (Original title, posted before modification)`;
    }

    // Handle Description Change: Append a phrase indicating the description has been updated
    let updatedDescription = description;
    updatedDescription = `${description} (Updated on ${new Date().toISOString()})`;

    // Prepare the query to update the question (description and title)
    let updateQuery = `UPDATE questions SET title = ?, description = ? WHERE questionid = ?`;
    let updateValues = [updatedTitle, updatedDescription, questionid]; // Add the updated description and title

    // Execute the query to update the question
    await dbConnection.query(updateQuery, updateValues);

    
      // Check if the answer already contains '(original answer)'
      const [existingAnswers] = await dbConnection.query(
        "SELECT * FROM answers WHERE questionid = ? AND answer NOT LIKE '%(posted before question modification)%'",
        [questionid]
      );

      if (existingAnswers.length > 0) {
        // If there are answers that do not already contain '(original answer)', append it
        await dbConnection.query(
          "UPDATE answers SET answer = CONCAT(answer, ' (posted before question modification)') WHERE questionid = ? AND answer NOT LIKE '%(posted before question modification)%'",
          [questionid]
        );
      }
    


    // Return a success response
    return res.status(StatusCodes.OK).json({
      msg: "Question updated successfully, redirecting to home",
      question_updated: true,
      // answer_updated: !!answer, // If an answer was provided, it indicates the answer was updated
      updated_at: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Error during update:", error);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "Failed to update question", error: error.message });
  }
};

module.exports = { ask, getAllQuestions, getSingleQuestion, editQuestion };
