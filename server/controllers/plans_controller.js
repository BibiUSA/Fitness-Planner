const { client } = require("./../models/db");
module.exports.plans = async (req, res, next) => {
  try {
    let insertData = `INSERT INTO fitness_task (plan, task) VALUES ('${req.body.plan}','${req.body.task}')`;
    const data = await client.query(insertData);
    console.log("Data Saved");
    res.send("Response Received" + req.body);
  } catch (error) {
    console.log(error);
  }
};

module.exports.getPlans = async (req, res) => {
  try {
    const getData = `SELECT * FROM public.fitness_task WHERE task = '1995ActuallyAPlan'
    ORDER BY task_id ASC `;
    const response = await client.query(getData);
    console.log(response);
    res.send({ data: response.rows });
  } catch (error) {
    console.log(error);
  }
};

module.exports.removePlan = async (req, res, next) => {
  console.log(req.params.plan);
  try {
    let removeData = `DELETE FROM fitness_task WHERE plan ='${req.params.plan}'`;
    await client.query(removeData);
    res.status(200).json({
      message: "Data Deleted",
    });
  } catch (error) {
    console.log(error);
  }
};

// app.get("/plans", (req, res) => {
//   const getData = `SELECT * FROM public.fitness_task WHERE task = '1995ActuallyAPlan'
//     ORDER BY task_id ASC `;
//   client

//     .then((response) => {
//       console.log(response);
//       res.send({ data: response.rows });
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// });
// asyncronous javascript
