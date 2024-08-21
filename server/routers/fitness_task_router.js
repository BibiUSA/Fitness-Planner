const express = require("express");
const {
  fitnessTask,
  Delete,
} = require("./../controllers/fitness_task_controller");

const router = express.Router();

// const obj =  {
//    get: function(middleware){

//    }
// }

router.route("/:plan").get(fitnessTask);
router.route("/:id").delete(Delete);

module.exports = router; /// default export system
