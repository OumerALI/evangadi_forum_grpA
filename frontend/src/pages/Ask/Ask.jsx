import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../Api/axiosConfig";
import classes from "./ask.module.css";

import { FaRegArrowAltCircleRight } from "react-icons/fa";

const Ask = () => {
  // State to handle messages for edit question
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  const navigate = useNavigate();
  const titleDom = useRef();
  const questionDom = useRef();
  const token = localStorage.getItem("token");

  async function handleSubmit(e) {
    e.preventDefault();
    const titleValue = titleDom.current.value;
    const questionValue = questionDom.current.value;

    try {
      const { data, status } = await axios.post(
        "/questions/ask",
        {
          title: titleValue,
          description: questionValue,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (status === 201 && data?.msg) {
        // Check if response is OK and then set success message
        setMessage(
          data?.msg || "Question posted successfully, redirecting to home"
        );
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
        error?.response?.data?.msg || "posting failed. Please try again.";
      setMessage(errorMessage);
      setMessageType("error");
    }
  }

  return (
    <section>
      <div className={classes["question-container"]}>
        <div className={classes["instructions"]}>
          <h2>Steps To Write A Good Question.</h2>
          <ul>
            <li>
              <span>
                <FaRegArrowAltCircleRight />
              </span>
              Summarize your problems in a one-line title.
            </li>
            <li>
              <span>
                <FaRegArrowAltCircleRight />
              </span>
              Describe your problem in more detail.
            </li>
            <li>
              <span>
                <FaRegArrowAltCircleRight />
              </span>
              Describe what you tried and what you expected to happen.
            </li>
            <li>
              <span>
                <FaRegArrowAltCircleRight />
              </span>
              Review your question and post it here.
            </li>
          </ul>
        </div>

        <div className={classes["post-question"]}>
          <h2>Post Your Question</h2>
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
            <input
              ref={titleDom}
              type="text"
              name="title"
              placeholder="Question title"
              className={classes["input-field"]}
            />
            <textarea
              ref={questionDom}
              name="details"
              placeholder="Question detail ..."
              className={classes["textarea-field"]}
            ></textarea>
            <button type="submit" className={classes["post-btn"]}>
              Post Question
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Ask;
