const express = require("express");
const { addcourseList, updateCourseList, getCourseList } = require("../db/db");
const courseRouter = express.Router();

courseRouter.post("/fetch", async (req, res) => {
  try {
    // logging request
    console.log("Fetch course request for id : ", req.body.id);

    // fetch timetable lidt for given id
    const result = await getCourseList(req.body.id);
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
courseRouter.post("/publish", async (req, res) => {
  // timetable is an array of array
  const { id, course } = req.body;
  let result;
  const isOld = await isCourseExistAlready(id);
  if (isOld) result = await addcourseList({ id, course });
  else {
    result = await updateCourseList({ id, course });
  }
  if (result) {
    return res.send({
      status: true,
      message: "publish successful",
    });
  }
  res.send({
    status: false,
    message: "publish unsuccessful",
  });
});

module.exports = courseRouter;
