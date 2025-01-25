// configure dotenv
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const geminiRouter = require("./src/controllers/gemini-controllers");
const courseRouter = require("./src/controllers/course-controllers");

const app = express();

app.use(express.json());

app.use(
  cors({
    origin: ["http://localhost:3000", "http://localhost:3001", "*"],
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
app.use("/api/gemini", geminiRouter);
app.use("/api/course", courseRouter);

app.listen(PORT, () => {
  console.log("server listening on port", PORT);
});
