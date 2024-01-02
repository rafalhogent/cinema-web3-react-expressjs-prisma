const prisma = require("../config/prisma_db");

const movieController = {
  getAll: async (req, res, next) => {
    try {
      const films = await prisma.film.findMany();
      res.send(films);
    } catch (error) {
      res.status(500).send("Er is een fout opgetreden");
    }
  },

  getById: async (req, res, next) => {
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
  },
};

module.exports = { movieController };
