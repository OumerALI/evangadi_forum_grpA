import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "../../Api/axiosConfig";
import { AppState } from "../../App";
import classes from "./answer.module.css";
import { IoIosContact } from "react-icons/io";
import { FaRegArrowAltCircleRight } from "react-icons/fa";

const Answer = () => {
  const navigate = useNavigate();
  const { questionid } = useParams();

  const [question, setquestion] = useState(null);

  const [answers, setanswers] = useState([]);
  const [newAnswer, setNewAnswer] = useState("");

  // State to handle messages for edit question
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  const token = localStorage.getItem("token");

  const { user } = useContext(AppState);

  async function fetchQuestion() {
    try {
      const { data } = await axios.get(`/questions/${questionid}`, {
        headers: { Authorization: "Bearer " + token },
      });
      // console.log(data);

      const singleQuestion = data?.question;

      setquestion(singleQuestion);
    } catch (error) {
      console.error("Error:", error.message);
    }
  }

  async function fetchAnswers() {
    try {
      const { data } = await axios.get(`/answer/${questionid}`, {
        headers: { Authorization: "Bearer " + token },
      });
      // console.log(data);

      const allAnswers = data?.answers;
      setanswers(allAnswers);
    } catch (error) {
      console.error("Error:", error?.response?.data?.msg);
    }
  }

  useEffect(() => {
    fetchQuestion();
    fetchAnswers();
  }, [questionid]);

  async function handleSubmit(e) {
    e.preventDefault();

    setanswers([
      {
        answer: newAnswer,
        created_at: new Date().toISOString(),
        username: user.username,
      },
      ...answers,
    ]);

    try {
      const { data, status } = await axios.post(
        "/answer",
        { questionid: questionid, answer: newAnswer },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (status === 201 && data?.msg) {
        // Check if response is OK and then set success message
        setMessage(data?.msg || "Posted successfully, redirecting to home");
        setMessageType("success");

        setTimeout(() => {
          navigate("/home");
        }, 2000);
      } else {
        // If response is not successful, set error message
        setMessage(data?.msg || "Posting failed. Please try again.");
        setMessageType("error");
      }
    } catch (error) {
      const errorMessage =
        error?.response?.data?.msg || "Posting failed. Please try again.";
      setMessage(errorMessage);
      setMessageType("error");

      // Rollback if the API call fails
      setanswers(answers);
    }
    // Clear the input
    setNewAnswer("");
  }

  return (
    <section>
      <div className={classes["answer-page"]}>
        <div className={classes["question-container"]}>
          <h2>QUESTION</h2>
          {question ? (
            <div className={classes["question"]}>
              <div className={classes["question-title"]}>
                <span className={classes["question-icon"]}>
                  <FaRegArrowAltCircleRight />
                </span>
                <strong>{question.title}</strong>
              </div>
              <div className={classes["question-description"]}>
                {question.description}
              </div>
            </div>
          ) : (
            <p>Loading question...</p>
          )}
        </div>

        {question?.userid == user?.userid ? (
          <button className={classes.button}>
            <Link to={`/edit-question/${questionid}`}>Edit your question</Link>
          </button>
        ) : (
          ""
        )}

        <div className={classes["community-answers"]}>
          <h3>Answer From The Community</h3>
          {answers.length > 0 ? (
            <div>
              {answers?.map((e, i) => (
                <div key={i} className={classes["answer-item"]}>
                  <div className={classes.user}>
                    <div className={classes["avatar"]}>
                      <IoIosContact size={"80"} />
                    </div>
                    <span className={classes["username"]}>{e.username}</span>
                  </div>

                  <div className={classes["answer-content"]}>
                    <p>{e.answer}</p>
                  </div>
                  {e?.username == user?.username ? (
                    <button className={classes.button}>
                      <Link to={`/edit-answer/${e?.answerid}`}>
                        Edit your answer
                      </Link>
                    </button>
                  ) : (
                    ""
                  )}
                </div>
              ))}
            </div>
          ) : (
            <p>No answers yet.</p>
          )}
        </div>

        <div className={classes["post-answer"]}>
          <div className={classes.successMessage}>
            {message && (
              <p
                style={{
                  color: messageType === "error" ? "red" : "green",
                  fontWeight: "bold",
                  textAlign: "center",
                }}
              >
                {message}
              </p>
            )}
          </div>
          <form onSubmit={handleSubmit}>
            <textarea
              value={newAnswer}
              onChange={(e) => setNewAnswer(e.target.value)}
              placeholder="Your answer ..."
              className={classes["answer-input"]}
            ></textarea>
            <button type="submit" className={classes["post-answer-btn"]}>
              Post Answer
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Answer;
