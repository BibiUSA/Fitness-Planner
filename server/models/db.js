const { Client } = require("pg");
module.exports.client = new Client({
  // naming export system
  user: "postgres",
  host: "localhost",
  database: "Fitness",
  password: "Skater28!",
  port: 5432,
});
