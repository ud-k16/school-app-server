const express = require("express");
const { addToTimeTableList, getTimeTableList } = require("../db/db");

const timetableRouter = express.Router();

timetableRouter.post("/fetch", async (req, res) => {
  const result = await getTimeTableList();
  if (result) {
    return res.send({
      status: true,
      message: "fetch successful",
      data: result,
    });
  }
  res.send({
    status: false,
    message: "fetch unsuccessful",
  });
});
timetableRouter.post("/publish", async (req, res) => {
  // timetable is an array of array
  const { id, timetable } = req.body;

  const result = await addToTimeTableList({ id, timetable });
  if (result) {
    return res.send({
      status: true,
      message: "insert successful",
    });
  }
  res.send({
    status: false,
    message: "insert unsuccessful",
  });
  //   console.log(result);
});

module.exports = timetableRouter;
