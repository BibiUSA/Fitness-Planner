const { client } = require("./../models/db");

let globalEmail = null;

module.exports.fitnessTask = async (req, res, next) => {
  console.log(req.params.plan);
  console.log("email??", req.query.email);
  const email = req.query.email;
  globalEmail = email;
  try {
    const getData = `SELECT * FROM public.fitness_task WHERE plan = '${req.params.plan}' and email='${email}'
        ORDER BY task_id ASC `; //probably also where the task in not completed

    const data = await client.query(getData);
    // console.log(data.rows);

    res.send({ data: data.rows });
  } catch (error) {
    console.log(error);
  }
};

module.exports.Delete = async (req, res, next) => {
  try {
    let deleteData = `DELETE FROM fitness_task WHERE task_id = ${req.params.id} and email= '${globalEmail}'`;
    await client.query(deleteData); //might need to make it completed or save it for copies
    res.status(200).json({
      message: "Data Deleted",
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports.addTask = async (req, res) => {
  console.log(req.body);
  try {
    let insertData = `INSERT INTO fitness_task (plan, task, plan_id, email) VALUES ('${req.body.plan}','${req.body.data}','${req.body.plan_id}', '${req.body.email}')`;
    const response = await client.query(insertData);
    console.log("Data Saved");
    res.send("Response Received" + response);
  } catch (error) {
    console.log(error);
  }
};

// more than better using global error handling with write proper api route with proper middleware function
