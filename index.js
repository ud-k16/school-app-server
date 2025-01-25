require("dotenv").config();
const { callGemini } = require("./src/api/gemini-api/gemini-api");

callGemini({ prompt: "3 line about money" });
