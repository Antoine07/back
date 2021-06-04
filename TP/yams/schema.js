
db.statistic.drop()
db.createCollection("statistic", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["combinations", "figure"],
      properties: {
        _id: {},
        date: {
          bsonType: "date",
          description: "must be date",
        },
        figure: {
          bsonType: "string",
          description: "must be a string and is required",
        },

        combinations: {
          bsonType: "object",
          required: ["dices"],
          properties: {
            dices: {
              bsonType: "array",
              description: "must be a array if the field exists",
            },
            ip: {
              bsonType: "string",
              description: "must be a string if the field exists",
            },
          },
        },
      },
    },
  },
});
db.patries.drop()
db.createCollection("patries", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["name", "number"],
      properties: {
        name: {
          bsonType: "string",
          description: "must be string is required",
        },
        number: {
          bsonType: "number",
          description: "must be a int and is required",
        },

        order: {
          bsonType: "number",
          description: "must be a string",
        },
      },
    },
  },
});

db.patries.insertMany([
  { name: "Fondant supreme", number: 10, order: 1 },
  { name: "Cake tout Chocolat", number: 10, order: 2 },
  { name: "Cake Framboise chocolat", number: 10, order: 3 },
  { name: "Brioche sucrée avec chocolat", number: 10, order: 4 },
  { name: "Cake glacé fondant au chocolat", number: 10, order: 5 },
  { name: "Eclairs au chocolat", number: 10, order: 6 },
  { name: "Tarte poire chocolat", number: 10, order: 7 },
  { name: "Banana  au chocolat", number: 10, order: 8 },
]);

