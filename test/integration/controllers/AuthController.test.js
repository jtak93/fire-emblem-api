var supertest = require('supertest');
var auth = require('../../authenticated');
var app = require('../../../app');

describe('AuthController', function(){
  it('prevents access to apis', function(done){
    supertest(app).get('/api/v1/user/me').expect(403, done);
  });
  describe('when session established', function(){
    describe('vendor', function(){
      it.skip('prevents users from create', function(){
      });
      it.skip('prevents users from delete', function(){
      });
      it.skip('prevents users from update', function(){
      });
    });
    describe('users', function(){
      it('prevents users from listing', function(done){
        auth.user.get('/api/v1/user').expect(403, done);
      });
    });
  })
});
