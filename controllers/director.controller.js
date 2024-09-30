const db = require("../models");
const { sendError500 } = require("../utils/request.utils");

// Obtener todos los directores con las películas
exports.listDirectores = async (req, res) => {
    try {
        const directores = await db.directores.findAll({
            include: [
                { model: db.peliculas, as: 'peliculas' } // Asegúrate de que la relación esté definida
            ]
        });
        res.status(200).json(directores);
    } catch (error) {
        sendError500(error, res);
    }
};



exports.getDirectorById = async (req, res) => {
    const { id } = req.params;
    try {
        const director = await db.directores.findByPk(id, {
            include: [
                { model: db.peliculas, as: 'peliculas' }
            ]
        });

        if (!director) {
            return res.status(404).json({ message: 'Director no encontrado' });
        }

        res.status(200).json(director);
    } catch (error) {
        sendError500(error, res);
    }
};


exports.createDirector = async (req, res) => {
    const { nombre, imagen_url } = req.body;

    try {
        const nuevoDirector = await db.directores.create({
            nombre,
            imagen_url
        });

        res.status(201).json({
            message: 'Director creado exitosamente',
            director: nuevoDirector
        });
    } catch (error) {
        sendError500(error, res);
    }
};


exports.updateDirector = async (req, res) => {
    const { id } = req.params;
    const { nombre, imagen_url, peliculas } = req.body; // Asegúrate de recibir las películas

    try {
        const director = await db.directores.findByPk(id);
        if (!director) {
            return res.status(404).json({ message: 'Director no encontrado' });
        }
        director.nombre = nombre;
        director.imagen_url = imagen_url;
        await director.save();
        if (peliculas) {
        }

        res.status(200).json(director);
    } catch (error) {
        sendError500(error, res);
    }
};


exports.deleteDirector = async (req, res) => {
    const { id } = req.params;

    try {
        const director = await db.directores.findByPk(id);

        if (!director) {
            return res.status(404).json({ message: 'Director no encontrado' });
        }

        await director.destroy();

        res.status(200).json({
            message: 'Director eliminado exitosamente'
        });
    } catch (error) {
        sendError500(error, res);
    }
};

