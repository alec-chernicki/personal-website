var express = require('express');
var expressValidator = require('express-validator');
var nodemailer = require('nodemailer');
var transporter = nodemailer.createTransport({
  host: 'smtp-mail.outlook.com',
  secureConnection: false,
  port: 587,
  auth: {
    user: process.env.EMAIL_USERNAME,
    pass: process.env.EMAIL_PASSWORD
  },
  tls: {
    ciphers: 'SSLv3'
  }
});

/**
 * Create Express server
 */
var app = express();

/**
 * Express configuration
 */
app.set('port', process.env.PORT || 3000);
app.use(expressValidator());
app.use(express.static('dist'));

/**
 * GET: Respond with rendering index page
 */
app.get('/', function (req, res) {
  res.render('index')
});

/**
 * POST: Pass to nodemailer and send email
 */
app.post('/', function (req, res) {
  req.checkBody('fullname', 'Name cannot be blank').notEmpty();
  req.checkBody('email', 'Email is not valid').isEmail();
  req.checkBody('message', 'Message cannot be blank').notEmpty();

  var errors = req.validationErrors();

  if (errors) {
    console.log(errors);
  }

  var from = req.body.email;
  var fullname = req.body.name;
  var body = req.body.message;
  var to = 'alecortega@live.com';
  var subject = 'Contact Form | Personal Website';

  var mailOptions = {
    to: to,
    from: from,
    subject: subject,
    text: body
  };

  transporter.sendMail(mailOptions, function(err) {
    if (err) {
      console.log('Mail not sent! Danger Will Robinson!');
      console.log(err);
    }
    console.log('Email sent! All clear!');
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
