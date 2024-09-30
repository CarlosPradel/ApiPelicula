module.exports = app => {
    let router = require("express").Router();
    const directorController = require("../controllers/director.controller.js");

    // Ruta para obtener todos los directores
    router.get('/directores', directorController.listDirectores);

    // Ruta para obtener un director por ID
    router.get('/directores/:id', directorController.getDirectorById);

    // Ruta para crear un nuevo director
    router.post('/directores', directorController.createDirector);

    // Ruta para actualizar un director
    router.put('/directores/:id', directorController.updateDirector);

    // Ruta para eliminar un director
    router.delete('/directores/:id', directorController.deleteDirector);

    app.use('/api', router); // Asocia estas rutas al endpoint /api
};
