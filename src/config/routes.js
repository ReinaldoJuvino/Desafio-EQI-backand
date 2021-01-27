module.exports = app => {
    
    app.route('/')
        .get(function (req, res) {
        res.send('Welcome to API DesapegaSolidario');
    });
    app.route('/users')
        //.all(app.src.config.passport.authenticate())
        .post(app.src.api.user.save)
        .get(app.src.api.user.get)

    app.route('/users/:id')
        //.all(app.src.config.passport.authenticate())
        .put(app.src.api.user.save)

}