var LastFmNode = require('lastfmapi');
var async = require('async');
/**
 * GET /
 * Home page
 */
exports.index = function(req, res) {

// TODO: Organize this code and remove get call to a controller.js to better modularize
  var lastfm = new LastFmNode({
    'api_key': '6f5612126bc766d04a8de77bcdc4403e',
    'secret': '6932b57b07162618ac5c8d5eedbcf6ea'
  });
  var trackStream = lastfm.stream('whynotdostuff');

  async.parallel({
    lastPlayed: function(done) {
      trackStream.on('lastPlayed', function (track) {
        console.log('Last played: ' + track.name);
        done(track)
      });
    },
    nowPlaying: function(done) {
      trackStream.on('nowPlaying', function (track) {
        console.log('Now playing: ' + track.name + ' by ' + track.artist);
        done(track)
      });
    }
  },

  trackStream.start(),

  function(err, results) {
    var track = {
      nowPlaying: results.nowPlaying.name,
      lastPlayed: results.nowPlaying.name
    };
    res.render('index', {
      track: track
    });
  });
};
