const RxDB = require("rxdb");
const { getRxStorageMemory } = require("rxdb/plugins/storage-memory");

const { RxDBUpdatePlugin } = require("rxdb/plugins/update");
const { timeTableSchema, courseSchema } = require("./schema.js");
const { socketInstance } = require("../socket/index.js");

var db, collection;

const initializeDB = async () => {
  try {
    RxDB.addRxPlugin(RxDBUpdatePlugin);
    //creation of a database
    db = await RxDB.createRxDatabase({
      name: "schoolapp",
      storage: getRxStorageMemory(),
    });
    if (db) {
      //creating a collection for timetable
      collection = await db.addCollections({
        timeTableList: {
          schema: timeTableSchema,
        },
        courseList: {
          schema: courseSchema,
        },
      });
      if (collection) return true;
      return false;
    }
  } catch (error) {
    console.log(error);
  }
};

/**
 * adds item to timetable list if not already present
 * @param {*} {id,timetable}
 * @returns true if added else false
 */
const addToTimeTableList = async ({ id, timeTable }) => {
  try {
    console.log("enter new timetable : ", id, timeTable);
    let addedOrNot;
    // add to timetablelist and return true indicating item added to list
    addedOrNot = await collection.timeTableList
      .insert({
        id,
        time_table: timeTable,
      })
      .catch((error) => console.log(error, "error"));

    //return false indicating given item not added now
    return addedOrNot ? true : false;
  } catch (error) {
    console.log(error);
  }
};

/**
 * adds item to timetable list if not already present
 * @param {*} {id,timetable}
 * @returns true if added else false
 */
const updateToTimeTableList = async ({ id, timeTable }) => {
  try {
    console.log("update timetable : ", id, timeTable);
    const doc = await collection.timeTableList
      .findOne({ selector: { id } })
      .exec();
    let updatedOrNot;
    //if item not exist add to timetablelist and return true indicating item added to list
    if (doc) {
      updatedOrNot = await doc
        .update({
          $set: {
            time_table: timeTable,
          },
        })
        .catch((error) => console.log(error, "error"));
    }
    if (updatedOrNot) {
      socketInstance.clients.forEach((client) => {
        client.emit("t_update", () => {
          client.send("update for time table");
        });
      });
    }

    return updatedOrNot ? true : false;
  } catch (error) {
    console.log(error);
  }
};
/**
 * check if item exist in timeTableList
 * @param {*} id
 * @returns true if item exist in timeTablelist or false if does not exist
 */
const isTimeTableExist = async (id) => {
  try {
    const document = await collection.timeTableList.find().exec();
    //check if data exist
    const exist = document.find((item) => item._data.id === id);
    //if exist return true else false
    return exist ? true : false;
  } catch (error) {}
};
/**
 * prints table list to console
 */
const printTableList = () => {
  collection.timeTableList
    .find()
    .exec()
    .then((document) => {
      console.log(`${JSON.stringify(document, null, 4)}`);
    });
};
/**
 *
 * @returns the timetable for id
 */
const getTimeTableList = async (id = "8") => {
  console.log("request to view time table for class  : ", id);
  const document = await collection.timeTableList.findOne(id.toString()).exec();
  console.log(" Document : ", document);

  return document;
};

// course section

/**
 * adds item to course list if not already present
 * @param {*} {id,timetable}
 * @returns true if added else false
 */
const addcourseList = async ({ id, course }) => {
  try {
    console.log("enter new course : ", id, course);
    let addedOrNot;
    // add to courseList and return true indicating item added to list
    addedOrNot = await collection.courseList
      .insert({
        id,
        course,
      })
      .catch((error) => console.log(error, "error"));

    // return false indicating given item not added now
    return addedOrNot ? true : false;
  } catch (error) {
    console.log(error);
  }
};

/**
 * adds item to course list if not already present
 * @param {*} {id,course}
 * @returns true if added else false
 */
const updateCourseList = async ({ id, course }) => {
  try {
    console.log("update course : ", id, course);
    const doc = await collection.courseList
      .findOne({ selector: { id } })
      .exec();
    let updatedOrNot;
    //if item not exist add to courseList and return true indicating item added to list
    if (doc) {
      updatedOrNot = await doc
        .update({
          $set: {
            course,
          },
        })
        .catch((error) => console.log(error, "error"));
    }
    if (updatedOrNot) {
      socketInstance.clients.forEach((client) => {
        client.emit("c_update", () => {
          client.send("update for course");
        });
      });
    }

    return updatedOrNot ? true : false;
  } catch (error) {
    console.log(error);
  }
};
/**
 * check if item exist in timeTableList
 * @param {*} id
 * @returns true if item exist in timeTablelist or false if does not exist
 */
const isCourseExistAlready = async (id) => {
  try {
    const document = await collection.courseList.find().exec();
    //check if data exist
    const exist = document.find((item) => item._data.id === id);
    //if exist return true else false
    return exist ? true : false;
  } catch (error) {}
};

/**
 *
 * @returns the timetable for id
 */
const getCourseList = async (id = "CLASS6A") => {
  console.log("request to view time table for class  : ", id);
  const document = await collection.courseList.findOne(id.toString()).exec();
  console.log(" Document : ", document);

  return document;
};

module.exports = {
  initializeDB,
  getTimeTableList,
  addToTimeTableList,
  updateToTimeTableList,
  isTimeTableExist,
  printTableList,
  addcourseList,
  updateCourseList,
  getCourseList,
  isCourseExistAlready,
};
