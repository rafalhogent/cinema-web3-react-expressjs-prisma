const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const { authorization } = require("../middleware/authorization");
const { userController } = require("../controllers/user_controller");
const {
  loginValidator,
  registerValidator,
} = require("../validators/user_validator");

router.post(
  "/register",
  [bodyParser.json(), registerValidator],
  userController.register
);

router.post(
  "/login",
  [bodyParser.json(), loginValidator],
  userController.login
);

router.delete("/logout", [authorization], userController.logout);
/* user info */
router.get("/info", [authorization], userController.info);

module.exports = router;
