var nodemailer = require('nodemailer');
var transporter = nodemailer.createTransport({
  host: 'smtp-mail.outlook.com',
  secureConnection: false,
  port: 587,
  auth: {
    user: secrets.email.user,
    pass: secrets.email.pass
  },
  tls: {
    ciphers: 'SSLv3'
  }
});


/**
 * GET /
 * Home page
 */


exports.index = function(req, res) {
  res.render('home');
};

/**
 * POST /
 * Home page
 */

exports.postIndex = function(req, res) {

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
      console.log('mail not sent! Danger Will Robinson!');
      console.log(err);
    }
    console.log('Email sent! All clear!');
  });
};
