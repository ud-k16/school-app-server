// configure dotenv
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const geminiRouter = require("./src/controllers/gemini-controllers");
const courseRouter = require("./src/controllers/course-controllers");
const timetableRouter = require("./src/controllers/timetable-controllers");
const { initializeDB } = require("./src/db/db");
const authRouter = require("./src/controllers/auth-controllers");
const { initializeSocket } = require("./src/socket");
const app = express();

app.use(express.json());

app.use(
  cors({
    origin: "*",
  })
);

const PORT = process.env.DEV_PORT || 7000;

// error handling middleware
app.use((err, req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  console.log(err.stack);
  res.status(500).send("Something broke!");
});

// router definition
app.use("/api/auth", authRouter);
app.use("/api/gemini", geminiRouter);
app.use("/api/course", courseRouter);
app.use("/api/timetable", timetableRouter);

app.listen(PORT, async () => {
  const dbConnection = await initializeDB();
  const socketConnection = await initializeSocket();
  if (dbConnection && socketConnection)
    console.log("server listening on port", PORT);
});
