'use strict';

var express =          require('express');
var bodyParser =       require('body-parser');
var compress =         require('compression');
var expressValidator = require('express-validator');
var favicon =          require('serve-favicon');
var path =             require('path');
var connectAssets =    require('connect-assets');

/**
 * Create Express server
 */
var app = express();

/**
 * Express configuration
 */
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'public'));
app.use(compress());
app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressValidator());
app.use(express.static('public'));

/**
 * Controllers
 */
var homeController =   require('./controllers/home.js');
var resumeController = require('./controllers/resume.js');


/**
 * Routes
 */
app.get('/', homeController.getHome);
app.post('/', homeController.postHome);

app.get('/resume', resumeController.getResume);

/**
 * Error Handler, in case the everything dies.
 */
app.use(function(err, req, res) {
  console.error(err.stack);
  res.sendStatus(500).send('Something broke!');
});

/**
 * Initialize Express server, let's fire this baby up!
 */
app.listen(app.get('port'), function() {
  console.log('Express server listening on port %d in %s mode', app.get('port'), app.get('env'));
});

module.exports = app;
