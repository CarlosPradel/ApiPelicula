module.exports = (sequelize, Sequelize) => {
    const Actor = sequelize.define("actor", {
        nombre: {
            type: Sequelize.STRING,
            allowNull: false
            },
            imagen_url: {
                type: Sequelize.STRING,
            }
    });

    Actor.associate = (models) => {
        Actor.belongsToMany(models.Pelicula, { through: 'Pelicula_Actores', foreignKey: 'actorId', as: 'peliculas' });
    };

    return Actor;
};
