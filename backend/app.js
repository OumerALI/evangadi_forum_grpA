/** @format */

// /** @format */

// require("dotenv").config();
// const express = require("express");
// const app = express();
// const port = process.env.PORT;
// const cors = require("cors");

// app.use(cors());

// // db connection
// const dbConnection = require("./db/dbConfig");

// // authentication middleware
// const authMiddleware = require("./middleware/authMiddleware");

// // user router middleware file
// const userRouter = require("./routes/userRoute");
// // json middleware to extract json data
// app.use(express.json());
// // user router middleware
// app.use("/api/users", userRouter);

// // question router middleware file
// const questionRoute = require("./routes/questionRoute");
// // question router middleware
// app.use("/api/questions", authMiddleware, questionRoute);

// // answer router middleware file
// const answerRoute = require("./routes/answerRoute");
// // answer router middleware
// app.use("/api", authMiddleware, answerRoute);

// async function start() {
//   try {
//     const result = await dbConnection.execute("select 'test'");
//     await app.listen(port);
//     console.log("database connection established");
//     console.log(`listening on ${port}`);
//   } catch (error) {
//     console.log(error.message);
//   }
// }
// start();
const express = require("express");
const app = express();
const cors = require("cors");

app.use(cors());

// Set the port dynamically based on Render's environment
const PORT = process.env.PORT || 5000; // Use Render's provided PORT or default to 5000

// Example middleware and routes (ensure you have them set up correctly)
const dbConnection = require("./db/dbConfig");
const authMiddleware = require("./middleware/authMiddleware");
const userRoute = require("./routes/userRoute");

app.use(express.json()); // Middleware to parse JSON
app.use("/users", userRoute); // Example route

// Start the server and listen on the correct port
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
// const express = require("express");
// const app = express();
// const cors = require("cors");

// app.use(cors());

// // Set the port dynamically based on Render's environment
// const PORT = process.env.PORT || 5000; // Use Render's provided PORT or default to 5000

// // Example middleware and routes (ensure you have them set up correctly)
// const dbConnection = require("./db/dbConfig");
// const authMiddleware = require("./middleware/authMiddleware");
// const userRoute = require("./routes/userRoute");

// app.use(express.json()); // Middleware to parse JSON
// app.use("/users", userRoute); // Example route

// // Start the server and listen on the correct port
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });
