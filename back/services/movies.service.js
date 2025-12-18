const { Movie } = require("../src/models/Movies");

const getMovieService = async () => {
  return await Movie.find()
}

const createMovieService = async (movie) => {

  const existingMovie = await Movie.findOne({ title: movie.title });

    if (existingMovie) {
        throw new Error("La película ya existe en la base de datos");
    }

  const newMovie = await Movie.create(movie);
  return newMovie;
}

module.exports = {
    getMovieService,
    createMovieService
}