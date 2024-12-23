/** @format */

import { createContext, useEffect, useState } from "react";
import "./App.css";
import Home from "./pages/Home/Home";
import { Route, Routes, useNavigate } from "react-router-dom";
import axios from "./Api/axiosConfig";
import Landing from "./pages/Landing/Landing";
import "bootstrap/dist/css/bootstrap.min.css";
import Ask from "./pages/Ask/Ask";
import Answer from "./pages/Answer/Answer";
import Layout from "./components/Layout/Layout";
import HowItWorks from "./pages/Links/HowItWorks/HowItWorks";
import PrivacyPolicy from "./pages/Links/PrivacyPolicy/PrivacyPolicy";
import TermsAndConditions from "./pages/Links/TermsAndConditions/TermsAndConditions";
import EditQuestion from "./pages/EditQuestion/EditQuestion";

export const AppState = createContext();

function App() {
  const [user, setUser] = useState({});
  const token = localStorage.getItem("token");

  const navigate = useNavigate();

  async function checkUser() {
    try {
      const { data } = await axios.get("/users/checkUser", {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      setUser(data);
    } catch (error) {
      console.log(error.response);
      navigate("/");
    }
  }

  useEffect(() => {
    checkUser();
  }, []);

  return (
    <AppState.Provider value={{ user, setUser }}>
      <Routes>
        <Route
          path="/"
          element={
            <Layout>
              <Landing />
            </Layout>
          }
        />
        <Route
          path="/home"
          element={
            <Layout>
              <Home />
            </Layout>
          }
        />
        <Route
          path="/ask"
          element={
            <Layout>
              <Ask />
            </Layout>
          }
        />
        <Route
          path="/question/:questionid"
          element={
            <Layout>
              <Answer />
            </Layout>
          }
        />
        <Route
          path="/edit-question/:questionid"
          element={
            <Layout>
              <EditQuestion />
            </Layout>
          }
        />
        <Route path="/howItWorks" element={<HowItWorks />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/termsAndConditions" element={<TermsAndConditions />} />
      </Routes>
    </AppState.Provider>
  );
}

export default App;
