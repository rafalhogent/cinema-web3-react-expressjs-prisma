const express = require("express");
const router = express.Router();
const { authorization } = require("../middleware/authorization");
const { ticketsController } = require("../controllers/tickets_controller");

router.get("/", authorization, ticketsController.getByOwner);
router.post("/", authorization, ticketsController.addTickets);

module.exports = router;
