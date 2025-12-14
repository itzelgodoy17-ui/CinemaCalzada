const validateMovieData = (req, res, next) => {

    const{ title, year, director, duration, genre, rate, poster} = req.body
    if (!title || !year || !director || !duration || !genre || !rate || !poster){

        res.status(400).json("Error: falta informacion para crear la pelicula")

    } else {
        next()
    }

}

const logData = (req, res, next) => {
    const timestamp = new Date().toISOString();
    const method = req.method;
    const url = req.url;

    console.log(`[${timestamp}] ${method} ${url}`);

    next();
}

module.exports = {
    validateMovieData,
    logData
}