const express = require("express");

const authRouter = express.Router();

authRouter.post("/login", async (req, res) => {
  if (req.body.userId === "uma" && req.body.password === "12345678") {
    return res.send({
      status: true,
      message: "logged in successful",
      data: {
        name: "uma k",
        user_type: "teacher",
      },
    });
  } else {
    return res.send({
      status: true,
      message: "logged in successful",
      data: {
        name: "uma k",
        user_type: "student",
        classId: "CLASS6A",
      },
    });
  }
});

module.exports = authRouter;
