const prisma = require("../config/prisma_db");

const hallController = {
  getAll: async (req, res, next) => {
    try {
      const halls = await prisma.hall.findMany();
      res.send(halls);
    } catch (error) {
      res.status(500).send("Er is een fout opgetreden");
    }
  },

  getById: async (req, res, next) => {
    const {
      params: { id },
    } = req;
    try {
      const m = await prisma.hall.findFirst({
        where: { id: +id },
        include: {
          showtimes: true
        },
      });
      res.send(m);
    } catch (error) {
      res.status(500).send("Er is een fout opgetreden");
    }
  },
};

module.exports = { hallController };
