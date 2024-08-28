const express = require("express");
const {
  loggingIn,
  protect,
  userInformation,
  autoLogin,
} = require("./../controllers/account_controller");

const router = express.Router();

router.route("/").post(loggingIn);
router.route("/protect").post(autoLogin);
router.route("/user/information").get(protect, userInformation);

module.exports = router;
