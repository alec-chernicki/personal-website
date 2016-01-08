var path = require('path');

exports.getResume = function (req, res) {
  var file = 'resources/resume.pdf';
  res.setHeader('Content-type', 'application/pdf');
  res.sendFile(file, {root: './'});
}
