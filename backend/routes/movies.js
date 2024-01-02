const express = require("express");
const router = express.Router();
const { authorization } = require("../middleware/authorization");
const { movieController } = require("../controllers/movies_controller");

router.get("/", authorization, movieController.getAll);

router.get("/:id([0-9]+)", authorization, movieController.getById);

module.exports = router;
