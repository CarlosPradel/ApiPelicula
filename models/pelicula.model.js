module.exports = (sequelize, Sequelize) => {
    const Pelicula = sequelize.define("pelicula", {
        titulo: {
            type: Sequelize.STRING,
            allowNull: false
        },
        sinopsis: {
            type: Sequelize.TEXT,
        },
        fecha_lanzamiento: {
            type: Sequelize.DATE,
            allowNull: false
        },
        imagen_url: {
            type: Sequelize.STRING,
        },
        calificacion_rotten_tomatoes: {
            type: Sequelize.DECIMAL(3, 1),
        },
        trailer_youtube_url: {
            type: Sequelize.STRING,
        }
    });

    Pelicula.associate = (models) => {
        Pelicula.belongsTo(models.Director, { foreignKey: 'directorId' });
        Pelicula.belongsToMany(models.Actor, { through: 'Pelicula_Actores', foreignKey: 'peliculaId', as: 'actores'});
    };

    return Pelicula;
};
