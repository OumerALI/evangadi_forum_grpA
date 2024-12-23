import React, { useContext, useState } from "react";
import { AppState } from "../../App";
import { useNavigate, useParams } from "react-router-dom";
import classes from "./editAnswer.module.css";
import axios from "../../Api/axiosConfig";

const EditAnswer = () => {
  const navigate = useNavigate();
  const { user } = useContext(AppState);
  const [newAnswer, setNewAnswer] = useState("");
  const { answerid } = useParams();

  // State to handle messages for edit question
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  const token = localStorage.getItem("token");

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const { data, status } = await axios.put(
        `/edit-answer/${answerid}`,
        { answerid: answerid, answer: newAnswer },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (status === 200 && data?.msg) {
        // Check if response is OK and then set success message
        setMessage(data?.msg || "Updated successfully, redirecting to home");
        setMessageType("success");

        setTimeout(() => {
          navigate(-1);
        }, 2000);
      } else {
        // If response is not successful, set error message
        setMessage(data?.msg || "Updating failed. Please try again.");
        setMessageType("error");
      }

    
    } catch (error) {
      const errorMessage =
        error?.response?.data?.msg || "Answering failed. Please try again.";
      setMessage(errorMessage);
      setMessageType("error");

    }
    
  }

  return (
    <div className={classes["edit__answer__container"]}>
      <div className={classes["post-answer"]}>
        <h2 className={classes['edit']}>Edit Your Answer</h2>
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
            placeholder="Your updated answer ..."
            className={classes["answer-input"]}
          ></textarea>
          <button type="submit" className={classes["post-answer-btn"]}>
            Post Answer
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditAnswer;
