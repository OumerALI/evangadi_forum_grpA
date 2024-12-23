import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../Api/axiosConfig";
import classes from "./ask.module.css";

import { FaRegArrowAltCircleRight } from "react-icons/fa";

const Ask = () => {
  const [successMessage, setsuccessMessage] = useState("");

  const navigate = useNavigate();
  const titleDom = useRef();
  const questionDom = useRef();
  const token = localStorage.getItem("token");

  async function handleSubmit(e) {
    e.preventDefault();
    const titleValue = titleDom.current.value;
    const questionValue = questionDom.current.value;

    if (!titleValue || !questionValue) {
      alert("please provide all required informations");
      return;
    }

    try {
      const { data } = await axios.post(
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
      setsuccessMessage("successfully posted redirecting to home page");

      // Redirect to home after 2 seconds
      setTimeout(() => {
        navigate("/home");
      }, 2000);
    } catch (error) {
      alert(error);
      console.log(error);
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
            {successMessage && (
              <p style={{ color: "green" }}>{successMessage}</p>
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
