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
var expressValidator = require('express-validator');
var connectAssets = require('connect-assets');

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
app.use(expressValidator());
app.use(sassMiddleware({
    src: path.join(__dirname, '/sass/stylesheets'),
    dest: path.join(__dirname, '/public/stylesheets'),
    debug: true,
    prefix: '/assets'
  })
);
app.use(connectAssets({
  paths: [path.join(__dirname, '/public/stylesheets'), path.join(__dirname, '/public/javascripts')]
}));
app.use('/bower_components',  express.static(__dirname + '/bower_components'));
app.use(express.static(path.join(__dirname, 'public')));


/**
 * Primary routes
 */
app.get('/', homeController.index);
app.post('/', homeController.postIndex);



/**
 * 404 Error catch and forward to error handler
 */
app.use(function(req, res, next) {
    var err = new Error(req + 'Not Found');
    err.status = 404;
    next(err);
});

/**
 * Error Handlers
 */

/**
 * Start Express server.
 */
app.listen(app.get('port'), function() {
  console.log('Express server listening on port %d in %s mode', app.get('port'), app.get('env'));
});

module.exports = app;
