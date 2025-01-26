const { GoogleGenerativeAI } = require("@google/generative-ai");

const callGemini = async ({ prompt = "Explain how AI works" }) => {
  try {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const result = await model.generateContent(prompt);
    console.log(result.response.text());
    return result.response.text();
  } catch (error) {
    console.log(error);

    return false;
  }
};

module.exports = {
  callGemini,
};
