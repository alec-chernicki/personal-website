var express = require('express');
var bodyParser = require('body-parser');
var compress = require('compression');
var expressValidator = require('express-validator');
var sgTransport = require('nodemailer-sendgrid-transport');
var nodemailer = require('nodemailer');
var favicon = require('serve-favicon');
var path = require('path');
var connectAssets = require('connect-assets');

var sendGridOptions = {
  auth: {
    api_user: process.env.SENDGRID_USERNAME,
    api_key: process.env.SENDGRID_PASSWORD
  }
};

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
  res.download(file);
});

/**
 * POST: Pass req to nodemailer and send email
 */
app.post('/', function(req,res) {

  var mailer = nodemailer.createTransport(sgTransport(sendGridOptions));

  req.checkBody('fullname', 'Name cannot be blank').notEmpty();
  req.checkBody('email', 'Email is not valid').isEmail();
  req.checkBody('message', 'Message cannot be blank').notEmpty();

  var errors = req.validationErrors();

  if (errors) {
    console.log(errors);
  }

  var from = '<' + req.body.email + '>';
  var fullname = '"' + req.body.name + '"';
  var fullSender = '\'' + fullname + from + '\'';
  var body = req.body.message;

  var email = {
    to: 'alecortega@live.com',
    from: fullSender,
    subject: 'Contact Form | Personal Website',
    text: body
  };

  mailer.sendMail(email, function(err, response) {
    if (err) {
      res.status(500).send({success: 'false'});
      console.log('Error');
    }
    console.log('Success');
    res.status(200).send({success: 'true'});
  });
});

/**
 * Error Handler, in case the everything dies.
 */
app.use(function(err, req, res, next) {
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
