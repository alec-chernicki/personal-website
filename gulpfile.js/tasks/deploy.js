var config  = require('../config')
var gulp    = require('gulp')
var open    = require('open')
var os      = require('os')
var package = require('../../package.json')
var path    = require('path')

var settings = {
  url: package.homepage,
  src: path.join(config.root.dest, '/**/*'),
}

var deployTask = function() {
  return gulp.src(settings.src)
    .on('end', function(){
      open(settings.url)
    })
}

gulp.task('deploy', ['production'], deployTask)
module.exports = deployTask
