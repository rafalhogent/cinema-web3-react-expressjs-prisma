const express = require("express");
const router = express.Router();
const _ = require("lodash");
// const logger = require("morgan");
const prisma = require("../config/prisma_db");
const authorization = require("../middleware/authorization");

router.get("/", authorization, async (req, res, next) => {
  try {
    const films = await prisma.film.findMany();

    res.send(films);
  } catch (error) {
    res.status(500).send("Er is een fout opgetreden");
  }
});

router.get("/:id([0-9]+)", authorization, async function (req, res, next) {
  const {
    params: { id },
  } = req;
  try {
    const m = await prisma.film.findFirst({
      where: { id: +id },
      include: {
        genres: true,
        cast: true,
      },
    });
    res.send(m);
  } catch (error) {
    res.status(500).send("Er is een fout opgetreden");
  }
});

module.exports = router;
