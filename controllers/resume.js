exports.getResume = function (req, res) {
  var file = path.join(__dirname + '/dist/images/resume.pdf');
  res.sendFile(file);
}
