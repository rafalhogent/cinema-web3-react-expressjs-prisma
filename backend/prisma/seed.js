const prisma = require("../config/prisma_db");
const genres = require("../data/genres-seed.json");
const films = require("../data/films-seed.json");
const cast = require("../data/cast-seed.json");

async function main() {
  await prisma.genre.deleteMany();
  await prisma.film.deleteMany();
  await prisma.actor.deleteMany();

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
}

main()
  .catch((err) => {
    console.log(err);
    process.exit(1);
  })
  .finally(() => {
    prisma.$disconnect();
  });
