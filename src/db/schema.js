const timeTableSchema = {
  title: "timeTableSchema",
  version: 0,
  primaryKey: "id",
  type: "object",
  properties: {
    id: {
      type: "string",
      minimum: 0,
      maxLength: 1000,
    },
    timetable: {
      type: "array",
    },
  },
  required: ["id"],
  indexes: ["id"],
};
module.exports = {
  timeTableSchema,
};
