const dbConfig = require("../config/db.config");
const Sequelize = require("sequelize");

const sequelize = new Sequelize(
    dbConfig.DB,
    dbConfig.USER,
    dbConfig.PASSWORD,
    {
        host: dbConfig.HOST,
        dialect: dbConfig.dialect,
    }
);

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Modelos
db.peliculas = require("./pelicula.model")(sequelize, Sequelize);
db.directores = require("./director.model")(sequelize, Sequelize);
db.actores = require("./actor.model")(sequelize, Sequelize);

// Relaciones entre Pelicula y Director (Uno a Muchos)
db.directores.hasMany(db.peliculas, { as: "peliculas", foreignKey: "directorId", onDelete: "CASCADE" });
db.peliculas.belongsTo(db.directores, { as: "director", foreignKey: "directorId" });

// Relaciones entre Pelicula y Actor (Muchos a Muchos)
db.peliculas.belongsToMany(db.actores, { through: "Pelicula_Actores", as: "actores", foreignKey: "peliculaId" });
db.actores.belongsToMany(db.peliculas, { through: "Pelicula_Actores", as: "peliculas", foreignKey: "actorId" });

module.exports = db;
