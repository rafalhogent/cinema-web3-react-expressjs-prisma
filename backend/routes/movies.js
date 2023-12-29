const express = require("express");
const router = express.Router();
// const movies = require("../data/movies.json");
const _ = require("lodash");
// const logger = require("morgan");
// const mysql = require("mysql2");
const prisma = require("../config/prisma_db");

router.get("/", async (req, res, next) => {
  try {
    const films = await prisma.film.findMany();

    res.send(
      films
    );
  } catch (error) {
    res.status(500).send("Er is een fout opgetreden");
  }
});

router.get("/:id([0-9]+)", async function (req, res, next) {
  const {
    params: { id },
  } = req;
  try {
    const m = await prisma.film.findFirst({ 
      where: {id: +id},
      include: {
        genres: true,
        cast: true
      }
    });
    res.send(m);
  } catch (error) {
    res.status(500).send("Er is een fout opgetreden");
  }
});

module.exports = router;