var secrets = require('../config/secrets');

var LastFmNode = require('lastfm').LastFmNode;
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

//
//// TODO: Organize this code and remove get call to a controller.js to better modularize
//var lastfm = new LastFmNode({
//  'api_key': '6f5612126bc766d04a8de77bcdc4403e',
//  'secret': '6932b57b07162618ac5c8d5eedbcf6ea'
//});
//var trackStream = lastfm.stream('whynotdostuff');
//
//trackStream.on('lastPlayed', function (track) {
//  console.log('Last played: ' + track.name);
//});
//
//trackStream.on('nowPlaying', function (track) {
//  console.log('Now playing: ' + track.name + ' by ' + track.artist);
//});
//
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
      console.log('Danger Will Robinson');
      console.log(err);
    }
    console.log('All clear!');
    res('Success');
  });
};
