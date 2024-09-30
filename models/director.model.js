module.exports = (sequelize, Sequelize) => {
    const Director = sequelize.define("director", {
        nombre: {
            type: Sequelize.STRING,
            allowNull: false
        },
        imagen_url: {
            type: Sequelize.STRING,
        }
    });

    Director.associate = (models) => {
        Director.hasMany(models.Pelicula, { foreignKey: 'directorId' });
    };

    return Director;
};
