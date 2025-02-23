const express = require("express");
const {
  addToTimeTableList,
  getTimeTableList,
  printTableList,
  updateToTimeTableList,
} = require("../db/db");

const timetableRouter = express.Router();

timetableRouter.post("/fetch", async (req, res) => {
  try {
    // logging request
    console.log("Fetch time table request for id : ", req.body.id);

    // fetch timetable lidt for given id
    const result = await getTimeTableList(req.body.id);
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
  } catch (error) {}
});
timetableRouter.post("/publish", async (req, res) => {
  // timetable is an array of array
  const { id, timeTable } = req.body;

  const result = await addToTimeTableList({ id, timeTable });
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
timetableRouter.post("/update", async (req, res) => {
  // timetable is an array of array
  const { id, timeTable } = req.body;

  const result = await updateToTimeTableList({ id, timeTable });
  if (result) {
    return res.send({
      status: true,
      message: "update successful",
    });
  }
  res.send({
    status: false,
    message: "update unsuccessful",
  });
  //   console.log(result);
});

module.exports = timetableRouter;
