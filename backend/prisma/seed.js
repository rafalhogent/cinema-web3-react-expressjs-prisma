const prisma = require("../config/prisma_db");
const genres = require("../data/genres-seed.json");
const films = require("../data/films-seed.json");
const cast = require("../data/cast-seed.json");
const halls = require("../data/hall-seed.json");
const { DateTime } = require("luxon");

async function main() {
  await prisma.genre.deleteMany();
  await prisma.film.deleteMany();
  await prisma.actor.deleteMany();
  await prisma.hall.deleteMany();
  await prisma.showtime.deleteMany();
  for (const actor of cast) {
    await prisma.actor.create({
      data: actor,
    });
  }

  for (const genre of genres) {
    await prisma.genre.create({
      data: genre,
    });
  }

  for (const film of films) {
    await prisma.film.create({
      data: {
        ...film,
        genres: {
          connect: film.genres
        },
        cast: {
          connect: film.cast
        }
      },
    });
  }

  for (const hall of halls) {
    await prisma.hall.create({
      data: hall,
    });
  }

  const showtimes = generateShowtimes();
  for (const show of showtimes) {
    await prisma.showtime.create({
      data: {
        ...show,
        hall: {
          connect: show.hall,
        },
        film: {
          connect: show.film,
        },
      },
    });
  }
}

const generateShowtimes = () => {
  const total = films.length;
  const totalShows = 15;
  const now = DateTime.now();
  const today = DateTime.local(now.year, now.month, now.day);

  const hours = [12, 16, 19];
  const slots = [];

  for (let dayIx = 1; dayIx < total * 3; dayIx++) {
    for (let hallIx = 0; hallIx < halls.length; hallIx++) {
      const day = today.plus(dayIx);
      for (let hourIx = 0; hourIx < hours.length; hourIx++) {
        const time = DateTime.local(
          day.year,
          day.month,
          day.day,
          hours[hourIx],
          0
        ); //
        slots.push({
          hall: halls[hallIx],
          start: time,
        });
      }
    }
  }

  const shows = [];
  for (const film of films) {
    const price = Math.floor(Math.random() * 10) + 10;
    for (let ix = 0; ix < totalShows; ix++) {
      const nr = Math.floor(Math.random() * 10);
      const slot = slots[nr];
      slots.slice(nr, 1);
      shows.push({
        start: slot.start.toJSDate(),
        price: price,
        hall: { id: slot.hall.id },
        film: { id: film.id },
      });
    }
  }
  return shows;
};

main()
  .catch((err) => {
    console.log(err);
    process.exit(1);
  })
  .finally(() => {
    prisma.$disconnect();
  });
