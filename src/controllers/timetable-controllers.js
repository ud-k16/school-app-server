const express = require("express");

const timetableRouter = express.Router();

timetableRouter.post("/fetch", async (req, res) => {});
timetableRouter.post("/publish", async (req, res) => {});

module.exports = timetableRouter;
