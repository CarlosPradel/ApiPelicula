module.exports = app => {
    let router = require("express").Router();
    const actorController = require("../controllers/actor.controller.js");

    // Ruta para obtener todos los actores
    router.get('/actores', actorController.listActores);

    // Ruta para obtener un actor por ID
    router.get('/actores/:id', actorController.getActorById);

    // Ruta para crear un nuevo actor
    router.post('/actores', actorController.createActor);

    // Ruta para actualizar un actor
    router.put('/actores/:id', actorController.updateActor);

    // Ruta para eliminar un actor
    router.delete('/actores/:id', actorController.deleteActor);

    app.use('/api', router); // Asocia estas rutas al endpoint /api
};
