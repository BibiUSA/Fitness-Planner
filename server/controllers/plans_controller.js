const { client } = require("./../models/db");
let globalEmail = null; //sets the email of the user value so that it can be used in other API calls.
module.exports.plans = async (req, res, next) => {
  console.log("GLOBAL", globalEmail);
  try {
    const max = `SELECT MAX(plan_id) FROM fitness_task WHERE email='${globalEmail}'`;
    const maxAns = await client.query(max);
    let maxID = maxAns.rows[0].max;
    if (maxID === null) {
      maxID = 1;
    } else {
      maxID = maxID + 1;
    }
    let insertData = `INSERT INTO fitness_task (plan, task, email,plan_id) VALUES ('${req.body.plan}','${req.body.task}','${globalEmail}','${maxID}')`;
    const data = await client.query(insertData);
    console.log("Data Saved");
    res.send("Response Received" + req.body);
  } catch (error) {
    console.log(error);
  }
};

//gets all the plans
module.exports.getPlans = async (req, res) => {
  const email = req.query.email;
  globalEmail = email;
  try {
    const getData = `SELECT * FROM public.fitness_task WHERE task = '1995ActuallyAPlan' and email = '${email}'
    ORDER BY task_id ASC `; //should I pull all the tasks and work with it in the memory or is just pulling the plan name better strategy?
    const response = await client.query(getData);

    res.send({ data: response.rows });
  } catch (error) {
    console.log(error);
  }
};

module.exports.removePlan = async (req, res, next) => {
  console.log(req.params.plan);

  try {
    let removeData = `DELETE FROM fitness_task WHERE plan ='${req.params.plan}' and email = '${globalEmail}'`;
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
