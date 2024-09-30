const db = require("../models");
const { sendError500 } = require("../utils/request.utils");


exports.listPeliculas = async (req, res) => {
    try {
        const peliculas = await db.peliculas.findAll({
            include: [
                { model: db.directores, as: 'director' },
                { model: db.actores, as: 'actores' }
            ],
            order: [['calificacion_rotten_tomatoes', 'DESC']]
        });

        res.status(200).json(peliculas);
    } catch (error) {
        console.error(error);
        sendError500(error, res);
    }
};


exports.getPeliculaById = async (req, res) => {
    try {
        const pelicula = await db.peliculas.findByPk(req.params.id, {
            include: ['director', 'actores']
        });

        if (!pelicula) {
            return res.status(404).json({ error: "Película no encontrada" });
        }

        res.json(pelicula);
    } catch (error) {
        sendError500(error, res);
    }
};



exports.createPelicula = async (req, res) => {
    try {
        const { titulo, sinopsis, fecha_lanzamiento, imagen_url, calificacion_rotten_tomatoes, trailer_youtube_url, directorId, actores } = req.body;

        const nuevaPelicula = await db.peliculas.create({
            titulo,
            sinopsis,
            fecha_lanzamiento,
            imagen_url,
            calificacion_rotten_tomatoes,
            trailer_youtube_url,
            directorId
        });

        // Asocia los actores a la película
        if (actores && actores.length > 0) {
            await nuevaPelicula.setActores(actores);
        }

        res.status(201).json(nuevaPelicula);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al agregar la película" });
    }
};

exports.updatePelicula = async (req, res) => {
    const { id } = req.params;
    const { titulo, sinopsis, fecha_lanzamiento, imagen_url, calificacion_rotten_tomatoes, trailer_youtube_url, directorId, actoresIds } = req.body;

    try {
        const pelicula = await db.peliculas.findByPk(id);

        if (!pelicula) {
            return res.status(404).json({ message: 'Película no encontrada' });
        }

        await pelicula.update({
            titulo,
            sinopsis,
            fecha_lanzamiento,
            imagen_url,
            calificacion_rotten_tomatoes,
            trailer_youtube_url,
            directorId
        });

        if (actoresIds && actoresIds.length) {
            await pelicula.setReparto(actoresIds);
        }

        res.status(200).json({
            message: 'Película actualizada exitosamente',
            pelicula
        });
    } catch (error) {
        sendError500(error, res);
    }
};


exports.deletePelicula = async (req, res) => {
    try {
        const pelicula = await db.peliculas.findByPk(req.params.id);

        if (!pelicula) {
            return res.status(404).json({ error: "Película no encontrada" });
        }

        await pelicula.destroy();

        res.json({ message: "Película eliminada correctamente" });
    } catch (error) {
        sendError500(error, res);
    }
};

