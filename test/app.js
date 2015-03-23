var request = require('supertest');
var app = require('../app.js');

describe('GET /', function() {
  it('should return 200 OK', function(done) {
    if (error) {
      console.log(error);
    }
    request(app)
      .get('/')
      .expect(200, done);
  });
});
