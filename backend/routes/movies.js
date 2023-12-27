const express = require("express");
const router = express.Router();
const movies = require("../data/movies.json");
const logger = require("morgan");

router.get("/", function (req, res, next) {
    res.send(movies);
});

router.get("/:id", function (req, res, next) {
    const { params: { id } } = req;
    res.send(movies[id]);
});

module.exports = router;