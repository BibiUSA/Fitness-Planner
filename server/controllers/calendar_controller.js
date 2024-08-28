const { client } = require("../models/db");

module.exports.checkEvent = async (req, res) => {
  try {
    const getData = `SELECT plan FROM fitness_task JOIN plan_dates ON  plan_id = plan_id WHERE date_scheduled=${req.body.date}`;
    const response = await client.query(getData);
    console.log(response);
    res.send({ data: response });
  } catch (error) {
    console.log(error);
  }
};
