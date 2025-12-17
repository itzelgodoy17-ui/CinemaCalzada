const mongoose = require("mongoose")

const movieObjConfig = {

    title: String,
    year: Number,
    director: String,
    duration: String,
    genre: [String],
    rate: Number,
    poster: String
}




const MovieSchema = new mongoose.Schema(movieObjConfig)

const Movie = mongoose.model("Movie", MovieSchema)

module.exports = {
    Movie
}