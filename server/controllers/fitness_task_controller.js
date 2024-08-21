const { client } = require("./../models/db");

module.exports.fitnessTask = async (req, res, next) => {
  console.log(req.params.plan);
  try {
    const getData = `SELECT * FROM public.fitness_task WHERE plan = '${req.params.plan}'
        ORDER BY task_id ASC `;

    const data = await client.query(getData);
    console.log(data);

    res.send({ data: data.rows });
    console.log(data);
  } catch (error) {
    console.log(error);
  }
};

module.exports.Delete = async (req, res, next) => {
  try {
    let deleteData = `DELETE FROM fitness_task WHERE task_id = ${req.params.id}`;
    await client.query(deleteData);
    res.status(200).json({
      message: "Data Deleted",
    });
  } catch (error) {
    console.log(error);
  }
};

// more than better using global error handling with write proper api route with proper middleware function
