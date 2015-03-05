/**
 *
 * Module dependencies.
 */
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var sassMiddleware = require('node-sass-middleware');
var connectAssets = require('connect-assets');
var routes = require('./routes/index');

/**
 * Controllers (route handlers)
 */
var homeController = require('./controllers/home');

/**
 * Create Express server
 */
var app = express();

/**
 * Express configuration
 */
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(require("connect-assets")());
app.use(sassMiddleware({
    src: __dirname + '/sass/',
    dest: __dirname + '/public',
    debug: true,
    outputStyle: 'expanded'
  })
);
app.use(connectAssets({
  paths: [path.join(__dirname, 'public/stylesheets'), path.join(__dirname, 'public/javascripts')]
}));
app.use('/bower_components',  express.static(__dirname + '/bower_components'));
app.use(express.static(path.join(__dirname, 'public')));


/**
 * Primary routes
 */
app.use('/', homeController.index);


/**
 * 404 Error catch and forward to error handler
 */
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/**
 * Error Handlers
 */
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
