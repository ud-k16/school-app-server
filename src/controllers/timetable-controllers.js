const express = require("express");
const { addToTimeTableList, getTimeTableList } = require("../db/db");

const timetableRouter = express.Router();

timetableRouter.post("/fetch", async (req, res) => {
  const result = await getTimeTableList();
  console.log(result);
});
timetableRouter.post("/publish", async (req, res) => {
  // timetable is an array of array
  const { id, timetable } = req.body;

  const result = await addToTimeTableList({ id, timetable });
  console.log(result);
});

module.exports = timetableRouter;
