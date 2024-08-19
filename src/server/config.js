const { engine } = require('express-handlebars');
const path = require('path');
const morgan = require('morgan');
const multer = require('multer');
const express = require('express');
const routes = require('../routes/index.js');
const errorHandler = require('errorhandler');
require('dotenv').config();


module.exports = app => {
    //    settings
    app.set('port', process.env.PORT || 3000);
    app.set('views', path.join(__dirname, '../views'));
    app.engine('.hbs', engine({
        defaultLayout: 'main',
        partialsDir: path.join(app.get('views'), 'partials'),
        runtimeOptions: {
            allowProtoPropertiesByDefault: true,
            allowedProtoMethodsByDefault: true
        },
        layoutsDir: path.join(app.get('views'), 'layouts'),
        extname: '.hbs',
        helpers: require('./helpers'),
    }))


    // middlewares
    app.set('view engine', '.hbs');
    app.use(morgan('dev'));
    app.use(multer({ dest: path.join(__dirname, '../public/upload/temp') }).single('image'));
    app.use(express.urlencoded({ extended: false }));
    app.use(express.json());


    // routes
    routes(app)

    // static files
    app.use('/public', express.static(path.join(__dirname, '../public')));

    // errorhandler

    if ('development' === app.get('env')) {
        app.use(errorHandler())
    }




    return app;
}