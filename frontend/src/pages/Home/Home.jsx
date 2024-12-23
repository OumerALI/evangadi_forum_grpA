import React, { useContext, useEffect, useState } from "react";
import { AppState } from "../../App";
import { Link } from "react-router-dom";
import axios from "../../Api/axiosConfig";
import classes from "./home.module.css";

import { MdKeyboardArrowRight } from "react-icons/md";
import { IoIosContact } from "react-icons/io";

const Home = () => {
  const { user } = useContext(AppState);
  const [questions, setquestions] = useState([]);
  const token = localStorage.getItem("token");

  const [searchQuery, setSearchQuery] = useState("");

  async function fetchData() {
    try {
      const { data } = await axios.get("/questions/all-questions", {
        headers: { Authorization: "Bearer " + token }, // Custom headers
      });

      const allQuestions = data?.questions;
      setquestions(allQuestions);
    } catch (error) {
      console.error("Error:", error.message);
    }
  }
  // console.log(questions);

  useEffect(() => {
    fetchData();
  }, []);

  // Handle search input change
  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  // Filter questions based on the search query
  const filteredQuestions = questions.filter((question) =>
    question.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <section>
      <div className={classes["main-container"]}>
        <div className={classes["welcome-section"]}>
          <Link to={"/ask"} className={classes["ask-question-btn"]}>
            Ask Question
          </Link>
          <div className={classes["welcome-message"]}>
            Welcome :
            <span className={classes["username"]}> {user?.username}</span>
          </div>
        </div>

        <div className={classes["search-bar"]}>
          <input
            value={searchQuery}
            onChange={handleSearch}
            type="text"
            className={classes["search-input"]}
            placeholder="Search question"
          />
        </div>

        {questions.length > 0 ? (
          <div>
            {filteredQuestions.map((e) => (
              <Link
                to={`/question/${e.questionid}`}
                className={classes["questions-list"]}
                key={e.questionid}
              >
                <div className={classes["question-item"]}>
                  <div className={classes["user-info"]}>
                    <div className={classes["user"]}>
                      <div className={classes["user-avatar"]}>
                        <IoIosContact size={"80"} />
                      </div>
                      <p>{e.username}</p>
                    </div>
                    <div className={classes["question-text"]}>{e.title}</div>
                  </div>
                  <div className={classes["arrow"]}>
                    <MdKeyboardArrowRight size={"60"} color="black" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <p>No questions asked yet.</p>
        )}
      </div>
    </section>
  );
};

export default Home;
