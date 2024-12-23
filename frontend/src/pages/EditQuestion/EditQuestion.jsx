import React, { useRef, useState } from "react";
import classes from "./editQuestion.module.css";
import { useNavigate, useParams } from "react-router-dom";
import axios from "../../Api/axiosConfig";

const EditQuestion = () => {
  const navigate = useNavigate();
  const { questionid } = useParams();
  const [successMessage, setsuccessMessage] = useState("");
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
      const { data } = await axios.put(
        `/questions/edit-question/${questionid}`,
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
      setsuccessMessage(
        "question successfully updated redirecting to home page"
      );

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
      <div className={classes["post-question"]}>
        <h2>Edit Your Question</h2>
        <div className={classes.successMessage}>
          {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
        </div>
        <form onSubmit={handleSubmit}>
          <input
            ref={titleDom}
            type="text"
            name="title"
            placeholder="Updated question title"
            className={classes["input-field"]}
          />
          <textarea
            ref={questionDom}
            name="details"
            placeholder="Updated question detail ..."
            className={classes["textarea-field"]}
          ></textarea>
          <button type="submit" className={classes["post-btn"]}>
            Post Question
          </button>
        </form>
      </div>
    </section>
  );
};

export default EditQuestion;
