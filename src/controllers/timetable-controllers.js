const express = require("express");
const {
  addToTimeTableList,
  getTimeTableList,
  isTimeTableExist,
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
  } catch (error) {
    console.log(error);
  }
});
timetableRouter.post("/publish", async (req, res) => {
  // timetable is an array of array
  const { id, timeTable } = req.body;
  let result;
  const isExist = await isTimeTableExist(id);

  console.log(isExist, "timeTable already present in the database");

  if (!isExist) result = await addToTimeTableList({ id, timeTable });
  else {
    result = await updateToTimeTableList({ id, timeTable });
  }
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
