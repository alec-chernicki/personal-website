'use strict';

var express = require('express');
var bodyParser = require('body-parser');
var compress = require('compression');
var expressValidator = require('express-validator');
var nodemailer = require('nodemailer');
var mg = require('nodemailer-mailgun-transport');
var favicon = require('serve-favicon');
var path = require('path');
var connectAssets = require('connect-assets');

/**
 * Create Express server
 */
var app = express();

/**
 * Express configuration
 */
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'dist'));
app.use(compress());
app.use(favicon(__dirname + '/dist/favicon.ico'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressValidator());
app.use(connectAssets({
  paths: [path.join(__dirname, '/dist/styles'), path.join(__dirname, '/dist/scripts')]
}));
app.use(express.static('dist'));

/**
 * GET: Respond with rendering index page
 */
app.get('/', function (req, res) {
  res.header('Cache-Control', 'public, max-age=86400');
  res.sendFile(path.join(__dirname + '/dist/index.html'));
});

/**
 * GET: Respond with download of resume
 */
app.get('/resume', function (req, res) {
  var file = path.join(__dirname + '/dist/images/resume.pdf');
  res.sendFile(file);
});

/**
 * POST: Pass req to nodemailer and send email
 */
app.post('/', function(req, res) {

  req.checkBody('name', 'Name cannot be blank').notEmpty();
  req.checkBody('email', 'Email is not valid').isEmail();
  req.checkBody('message', 'Message cannot be blank').notEmpty();

  var errors = req.validationErrors();

  if (errors) console.log(errors);

  var auth = {
    auth: {
      api_key: process.env.MAILGUN_KEY,
      domain: 'alecortega.com'
    }
  };

  var nodemailerMailgun = nodemailer.createTransport(mg(auth));

  var from = req.body.email;
  var name = req.body.name;
  var body = req.body.message;

  var mailOptions = {
    to: 'aleccortega@gmail.com',
    from: from,
    subject: 'Contact Form | Personal Website',
    html: name + '<br><br>' + body
  };

  // send mail with defined transport object
  nodemailerMailgun.sendMail(mailOptions, function(error) {
    if (error) return console.log(error);
    res.sendStatus(200);
  });
});

/**
 * Error Handler, in case the everything dies.
 */
app.use(function(err, req, res) {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});


/**
 * Initialize Express server, let's fire this baby up!
 */
app.listen(app.get('port'), function() {
  console.log('Express server listening on port %d in %s mode', app.get('port'), app.get('env'));
});

module.exports = app;
