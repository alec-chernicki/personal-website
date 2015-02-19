'use strict';

var LastfmAPI = require('lastfmapi');

var lfm = new LastfmAPI({
  'api_key' : '6f5612126bc766d04a8de77bcdc4403e',
  'secret' : '6932b57b07162618ac5c8d5eedbcf6ea'
});

lfm.track.getInfo({
  'artist' : 'Poliça',
  'track' : 'Wandering Star'
}, function (err, track) {
  if (err) { throw err; }
  console.log(track);
});
