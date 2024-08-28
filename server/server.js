const dotenv = require("dotenv");
const { client } = require("./models/db");

dotenv.config({
  path: "./config.env",
});

const app = require("./app");

// database connection code

// const client = new Client({
//   user: process.env.USER,
//   host: process.env.HOST,
//   database: process.env.DATABASE,
//   password: process.env.PASSWORD,
//   port: process.env.DATABASE_PORT,
// });

client
  .connect()
  .then(() => {
    console.log("Connected to PostgreSQL!");
  })
  .catch((err) => {
    console.log("Error connecting to database:", err);
  });

// const process = {
//     env: {
//         PORT: 3001
//     }
// }

const port = process.env.PORT; // || 3001

app.listen(port, () => {
  console.log(`Server running on port ${port}.`);
});
