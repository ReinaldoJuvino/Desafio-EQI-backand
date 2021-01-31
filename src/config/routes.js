module.exports = app => {
    
    app.route('/')
        .get(function (req, res) {
        res.send('Welcome to APi');
    });
    app.route('/users')
        .post(app.src.api.user.save)
        .get(app.src.api.user.get)
        .options(app.src.api.headerOptions.options)

    app.route('/users/:id')
        .put(app.src.api.user.save)
        .options(app.src.api.headerOptions.options)
    
        app.route('/investment-parameters')
        .post(app.src.api.investment.save)
        .options(app.src.api.headerOptions.options)

    app.route('/investment-parameters/:id')
        .put(app.src.api.investment.save)
        .get(app.src.api.investment.get)
        .options(app.src.api.headerOptions.options)
        
}