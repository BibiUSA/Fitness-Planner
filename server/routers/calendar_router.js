const express = require("express");

const { checkEvent } = require("./../controllers/calendar_controller");

const router = express.Router();

router.route("/").get(checkEvent);

module.exports = router;
