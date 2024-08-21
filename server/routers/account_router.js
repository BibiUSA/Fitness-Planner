const express = require("express");
const {
  loggingIn,
  protect,
  userInformation,
} = require("./../controllers/account_controller");

const router = express.Router();

router.route("/").post(loggingIn);
router.route("/protect").post(protect);
router.route("/user/information").get(protect, userInformation);

module.exports = router;
