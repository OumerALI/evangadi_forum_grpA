import axios from "axios";

const axiosBase = axios.create({
  // baseURL: "http://localhost:5500/api",

  //NOTE - render
  baseURL: "https://backend-forum-4.onrender.com",
});

export default axiosBase
