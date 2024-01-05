const prisma = require("../config/prisma_db");

const ticketsController = {
  getByOwner: async (req, res, next) => {
    try {
      const tickets = await prisma.ticket.findMany({
        where: {
          ownerId: req.user.id,
        },
        include:{
          showtime:{
            include:{
              film: true,
              hall: true
            }
          }
        }
      });
      res.send(tickets);
    } catch (error) {
      res.status(500).send("An error has occurred");
    }
  },

  addTickets: async (req, res, next) => {
    const ticketsDto = req.body;
    const tickets = ticketsDto.map((dto) => {
      return {
        ownerId: req.user.id,
        buyDate: new Date(),
        showtimeId: dto.showtimeId,
        seatNr: dto.seatNr,
        price: dto.price,
      };
    });

    try {
      const dbres = await prisma.ticket.createMany({
        data: tickets,
      });
      res.send(dbres);
    } catch (error) {
      res.status(500).send("An error has occurred" + error.message);
    }
  },
};

module.exports = { ticketsController };
