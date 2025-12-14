const { getMovieService, createMovieService } = require("../services/movies.service.js")

const getMoviesController = (req, res) => {
    const resultado = getMovieService()
    res.status(200).json(resultado)
}

const createMovieController = (req, res) => {


    const resultado = createMovieService(req.body)
    res.status(200).json({
        msg: "Pelicula creada con exito",
        date: resultado
    })


}



module.exports = {
    getMoviesController,
    createMovieController
}