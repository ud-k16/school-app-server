const RxDB = require("rxdb");
const { getRxStorageMemory } = require("rxdb/plugins/storage-memory");
const { timeTableSchema } = require("./schema.js");

var db, collection;
const initializeDB = async () => {
  try {
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
const addToTimeTableList = async ({ id, timetable }) => {
  try {
    console.log("enter new timetable : ", id, timetable);

    const isExist = await isExistAlready(id.toString());
    let addedOrNot;
    console.log(`${id} `, "already exist : ", isExist);
    //if item not exist add to timetablelist and return true indicating item added to list
    if (!isExist) {
      addedOrNot = await collection.timeTableList
        .insert({
          id: id.toString(),
          timetable,
        })
        .catch((error) => console.log(error, "error"));
    }
    //if item already exist return false indicating given item not added now
    return addedOrNot ? true : false;
  } catch (error) {
    console.log(error);
  }
};

/**
 * check if item exist in timeTableList
 * @param {*} id
 * @returns true if item exist in timeTablelist or false if does not exist
 */
const isExistAlready = async (id) => {
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

module.exports = {
  initializeDB,
  getTimeTableList,
  addToTimeTableList,
  printTableList,
};
