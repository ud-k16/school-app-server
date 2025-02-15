import { createRxDatabase } from "rxdb";
import { getRxStorageMemory } from "rxdb/plugins/storage-memory";
import { timeTableSchema } from "./schema.js";

//creation of a database
const db = await createRxDatabase({
  name: "school-app",
  storage: getRxStorageMemory(),
});
//creating a collection for timetable
const collection = await db.addCollections({
  timeTableList: {
    schema: timeTableSchema,
  },
});

/**
 * adds item to timetable list if not already present
 * @param {*} {id,timetable}
 * @returns true if added else false
 */
export const addToTimeTableList = async ({ id, timetable }) => {
  try {
    const isExist = await isExistAlready(id);
    let addedOrNot;
    // console.log(`${id} `, 'already exist : ', isExist);
    //if item not exist add to timetablelist and return true indicating item added to list
    if (!isExist) {
      addedOrNot = await collection.timeTableList
        .insert({
          id,
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
export const printTableList = () => {
  collection.timeTableList
    .find()
    .exec()
    .then((document) => {
      const resultSet = document.map((item) => ({
        id: item._data.id,
        table: item._data.timetable,
      }));
      console.log(`${JSON.stringify(resultSet, null, 4)}`);
    });
};
/**
 *
 * @returns the timetable list in an array
 */
export const getTimeTableList = async () => {
  const document = await collection.timeTableList.find().exec();
  const tableList = document.map((item) => ({
    id: item._data.id,
    table: item._data.timetable,
  }));
  return tableList;
};
