const express = require("express");
const router = express.Router();
const movies = require("../data/movies.json");
// const logger = require("morgan");
// const mysql = require("mysql2");
const prisma = require("../config/prisma_db");

router.get("/", async (req, res, next) => {
  try {
    const films = await prisma.film.findMany();
    res.send(
      films.map((m) => {
        return {
          title: m.titel,
          year: m.releasejaar,
          genres: [m.genre],
          extract: m.beschrijving,
          thumbnail: m.image,
        };
      })
    );
  } catch (error) {
    res.status(500).send("Er is een fout opgetreden");
  }
});


router.get("/:id+", async function (req, res, next) {
  const {
    params: { id },
  } = req;
  try {
    const m = await prisma.film.findFirst({ where: {id: +id} });
    res.send({
      title: m.titel,
      year: m.releasejaar,
      genres: [m.genre],
      extract: m.beschrijving,
      thumbnail: m.image,
      cast: []
    });
  } catch (error) {
    res.status(500).send("Er is een fout opgetreden");
  }
});

module.exports = router;