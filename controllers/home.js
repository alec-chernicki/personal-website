var nodemailer =       require('nodemailer');
var mg =               require('nodemailer-mailgun-transport');

exports.getHome = function (req, res) {
  res.sendFile('../public/index.html');
}

exports.postHome = function(req, res) {

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
}
