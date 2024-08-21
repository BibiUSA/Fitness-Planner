const express = require("express");
const app = express();
const port = 3001;
const cors = require("cors");
// const { Client } = require("pg");

// const bodyParser = require("body-parser");
const dirname = require("path");
const fileURLToPath = require("url");

// const client = new Client({
//   user: "postgres",
//   host: "localhost",
//   database: "Fitness",
//   password: "Skater28!",
//   port: 5432,
// });

//connecting to the db
// client
//   .connect()
//   .then(() => {
//     console.log("Connected to PostgreSQL!");
//   })
//   .catch((err) => {
//     console.log("Error connecting to database:", err);
//   });

// app.use(express.json());
// app.use(bodyParser.urlencoded({ extended: true }));

// const corsOptions = {
//   origin: ["http://localhost:5173"],
// };

// app.use(cors(corsOptions));

// app.get("/api", (req, res) => {
//   const getData = `SELECT * FROM public.fitness_task
//   ORDER BY task_id ASC `;
//   client
//     .query(getData)
//     .then((response) => {
//       res.send({ data: response.rows });
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// }); // need to work on getting the data back in

// app.get("/plans", (req, res) => {
//   const getData = `SELECT * FROM public.fitness_task WHERE task = '1995ActuallyAPlan'
//   ORDER BY task_id ASC `;
//   client
//     .query(getData)
//     .then((response) => {
//       console.log(response);
//       res.send({ data: response.rows });
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// });
// const req = {
//   body: {
//     data: "Najmus",
//   },
// };
// const res = {
//   json: (parameter) => {},
// };

//adds data to the data base
// app.post("/create", (req, res) => {
//   console.log(req.body.data);
//   console.log(req.body.plan);
//   // res.json(req.body.data);
//   let insertData = `INSERT INTO fitness_task (plan, task) VALUES ('${req.body.plan}','${req.body.data}')`;
//   client
//     .query(insertData)
//     .then((response) => {
//       console.log("Data Saved");
//       console.log(response);
//     })
//     .catch((err) => {
//       console.log(err);
//     });
//   res.send("Response Received" + req.body);
// });

// app.post("/plans", (req, res) => {
//   console.log(req.body);
//   console.log(req.body.plan);
//   // res.json(req.body.data);
//   let insertData = `INSERT INTO fitness_task (plan, task) VALUES ('${req.body.plan}','${req.body.task}')`;
//   client
//     .query(insertData)
//     .then((response) => {
//       console.log("Data Saved");
//       console.log(response);
//     })
//     .catch((err) => {
//       console.log(err);
//     });
//   res.send("Response Received" + req.body);
// });

// /api/plans, /api/fitness, /api/fitness

app.delete("/create", (req, res) => {
  console.log(req.body);
  let deleteData = `DELETE FROM fitness_task WHERE task_id = ${req.body.id}`;
  client
    .query(deleteData)
    .then((response) => {
      console.log("Data Deleted");
      console.log(response);
      res.send(req.body.data);
    })
    .catch((err) => {
      console.log("error here", err);
    });
});

app.listen(3001, () => {
  console.log(`Server running on port ${port}.`);
});

// // we can import or export using two way

// // using es6 module or version
//    // export
//   export const department = "CSE"  // naming export system
//   export const  userName = "Najmus Shakib"

//   // if we want to export only one variable or function from server.js file then we can use default export system
// const userAge = 27;
// export default userAge;

// /// import system
// import express from 'express';  // default import system

// import {dirname} from 'path'  // naming export system

// // way number two using es5 module or version

// module.export.department = "CSE" // naming export system
// module.exports= userName; // default export sytem

// // import system
// const express = require('express') // default import system
// const {}dirname = require('path') // naming import sytem

// Get // Browser have access only this get method
// Post // if we want to create or insert any data into database then
// Patch // update any thing from database
// Delete

// post man

// mvc
// m = model   -- > database
// v = view  --- > frontend
// c = controller ---> backend related code or logic

// Rest api
//

// middleware

// two types of database
// sql  -- > mysql, postgrasql  -- >
// nosql  --> mongodb
