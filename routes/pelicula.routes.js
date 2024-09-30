module.exports = app => {
    let router = require("express").Router();
    const peliculaController = require("../controllers/pelicula.controller.js");

    // Ruta para obtener todas las películas
    router.get('/peliculas', peliculaController.listPeliculas);

    // Ruta para obtener una película por ID
    router.get('/peliculas/:id', peliculaController.getPeliculaById);

    // Ruta para crear una nueva película
    router.post('/peliculas', peliculaController.createPelicula);

    // Ruta para actualizar una película
    router.put('/peliculas/:id', peliculaController.updatePelicula);

    // Ruta para eliminar una película
    router.delete('/peliculas/:id', peliculaController.deletePelicula);

    app.use('/api', router); // Asocia estas rutas al endpoint /api
};
