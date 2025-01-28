const express = require("express");
const { callGemini } = require("../api/gemini-api/gemini-api");

const geminiRouter = express.Router();

geminiRouter.post("/gemini-request", async (req, res) => {
  console.log(req.body, "Gemini-request");

  const question = req.body.question;
  const geminiResponse = await callGemini({ prompt: question });
  if (geminiResponse)
    res.send({
      status: true,
      data: geminiResponse,
      message: "response successful",
    });
  else {
    res.send({
      status: false,
      message: "response unsuccessful",
    });
  }
});

module.exports = geminiRouter;
