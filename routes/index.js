module.exports = app => {
    require ("./actor.routes")(app);
    require ("./director.routes")(app);
    require ("./pelicula.routes")(app);
}