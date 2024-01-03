const express = require("express");
const router = express.Router();
const { authorization } = require("../middleware/authorization");
const { hallController } = require("../controllers/halls_controller");

router.get("/", authorization, hallController.getAll);

router.get("/:id([0-9]+)", authorization, hallController.getById);

module.exports = router;
