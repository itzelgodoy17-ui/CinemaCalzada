const { dbConnection } = require("./src/db/dbConfig");
const { app } = require("./src/server");
require("dotenv").config()

const { PORT } = process.env

dbConnection()
.then(() => {
    console.log("Conexion a la base de datos fue exitosa");
    app.listen( PORT, () => {
        console.log(`Server listen on port ${PORT}`);
    })
})
.catch( err => console.log(err))
