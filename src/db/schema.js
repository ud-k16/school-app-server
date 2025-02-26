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
    time_table: {
      type: "array",
    },
  },
  required: ["id"],
  indexes: ["id"],
};

const courseSchema = {
  title: "courseSchema",
  version: 0,
  primaryKey: "id",
  type: "object",
  properties: {
    id: {
      type: "string",
      minimum: 0,
      maxLength: 1000,
    },
    course: {
      type: "array",
    },
  },
  required: ["id"],
  indexes: ["id"],
};
module.exports = {
  timeTableSchema,
  courseSchema,
};
