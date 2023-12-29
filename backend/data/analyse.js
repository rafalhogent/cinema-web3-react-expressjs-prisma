const moviesJSON = require("../data/movies.json");
const _ = require("lodash");
const fs = require("fs");

const myGenres = [
  "Horror",
  "Action",
  "Science Fiction",
  "Comedy",
  "Drama",
  "Crime",
  "Thriller",
  "Adventure",
  "Fantasy",
  "War",
  "Superhero",
  "Family",
  "Romance",
  "Spy",
  "Historical",
  "Political",
  "Animated",
  "Musical",
  "Biography",
  "Documentary",
  "Erotic",
  "Western",
  "Disaster",
];

const genresObj = myGenres.map((g, idx) => {
  return {
    id: idx + 1,
    name: g,
  };
});

const movies = _.orderBy(
  moviesJSON.filter(
    (m) =>
      m.thumbnail &&
      m.cast &&
      m.cast?.length < 5 && m.cast?.length > 1 &&
      m.extract?.length < 600 &&
      m.extract?.length > 400 &&
      m.genres?.length &&
      m.title &&
      m.year &&
      m.genres.every((g) => myGenres.includes(g))
  ),
  (m) => m.extract.length
).slice(0, 50);

// const mx = _.maxBy(movies, (m) => m.extract?.length).extract.length;
// const genres = _.uniq(_.flatMap(movies, (m) => m.genres));

const cast = _.uniq(_.flatMap(movies, (m) => m.cast));
const actorsObj = cast.map((c, idx) => {
  return {
    id: idx + 1,
    name: c,
  };
});

const films = movies.map((x, idx) => {
  return {
    id: idx + 1,
    title: x.title,
    description: x.extract,
    genres: x.genres.map((g) => {
      return { id: genresObj.find((go) => go.name == g).id };
    }),
    cast: x.cast.map((c) => {
      return { id: actorsObj.find((a) => a.name == c).id };
    }),
    year: x.year,
    image: x.thumbnail,
    duration: 80 + Math.floor(Math.random() * 100),
  };
});


fs.writeFile("data/films-seed.json", JSON.stringify(films), (err) => {
  if (err) console.log(err);
});

fs.writeFile("data/cast-seed.json", JSON.stringify(actorsObj), (err) => {
  if (err) console.log(err);
});

fs.writeFile("data/genres-seed.json", JSON.stringify(genresObj), (err) => {
  if (err) console.log(err);
});


