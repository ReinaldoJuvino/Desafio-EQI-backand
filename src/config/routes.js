module.exports = app => {
    
    app.route('/')
        .get(function (req, res) {
        res.send('Welcome to APi');
    });
    app.route('/users')
        .post(app.src.api.user.save)
        .get(app.src.api.user.get)

    app.route('/users/:id')
        .put(app.src.api.user.save)
    
        app.route('/investiment-parameters')
        .post(app.src.api.investiment.save)

    app.route('/investiment-parameters/:id')
        .put(app.src.api.investiment.save)
        .get(app.src.api.investiment.get)
        
}