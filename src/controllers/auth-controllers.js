const express = require("express");

const authRouter = express.Router();

authRouter.post("/login", async (req, res) => {
  if (req.body.userId === "uma" && req.body.password === "12345678") {
    return res.send({
      status: true,
      message: "logged in successful",
      data: {
        name: "uma",
        user_type: "teacher",
        classId: "CLASS6A",
      },
    });
  } else if (req.body.userId === "uma k" && req.body.password === "12345678") {
    return res.send({
      status: true,
      message: "logged in successful",
      data: {
        name: "uma k",
        user_type: "student",
        classId: "CLASS6A",
      },
    });
  } else {
    return res.send({
      status: false,
      message: "unauthorized",
    });
  }
});

module.exports = authRouter;
