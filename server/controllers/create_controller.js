const { client } = require("../models/db");

// module.exports.addTask = async (req, res) => {
//   try {
//     let insertData = `INSERT INTO fitness_task (plan, task, plan_id, email) VALUES ('${req.body.plan}','${req.body.data}','${req.body.plan_id}', '${req.body.email}')`;
//     const response = await client.query(insertData);
//     console.log("Data Saved");
//     res.send("Response Received" + response);
//   } catch (error) {
//     console.log(error);
//   }
// };

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
