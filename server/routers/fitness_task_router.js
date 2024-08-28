const express = require("express");
const {
  fitnessTask,
  Delete,
  addTask,
} = require("./../controllers/fitness_task_controller");

const router = express.Router();

// const obj =  {
//    get: function(middleware){

//    }
// }

router.route("/:plan").get(fitnessTask);
router.route("/:id").delete(Delete);
router.route("/create").post(addTask);

module.exports = router; /// default export system
