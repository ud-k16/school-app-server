export const timeTableSchema = {
  title: "timeTableSchema",
  version: 0,
  primaryKey: "id",
  type: "object",
  properties: {
    id: {
      type: "number",
      minimum: 0,
      maxLength: 100,
    },
    timetable: new Map(),
  },
  required: ["id"],
  indexes: ["id"],
};
