var auth = require('../../authenticated');
var should = require('chai').should()
var crypto = require('crypto');

describe('UserController', function(){
  describe('#read', function(){
    it('can read their own user information without admin access', function(done){
      auth.user.get('/api/v1/account').expect(200).end(done);
    });
    it('contains fields that should be shown', function(done){
      auth.user.get('/api/v1/account').end(function(err, res){
        res.body.should.include.keys('_id', 'facebookId')
        done();
      });
    });
  });
  describe('#update', function(){
    it('updates the users info', function(done){
      auth.user.put('/api/v1/account', {deviceToken: 'abcdef'}).expect(200, done);
    });
    it('allows updates on settings', function(done){
      var settings = {enable_notifications: true};
      auth.user.put('/api/v1/account').send({settings: settings}).end(function(err, res){
        res.body.settings.enable_notifications.should.be.true;
        done();
      });
    });
    describe('when an existing user has a certain username', function(){
      var randomName = new Date().valueOf();
      before(function(done){
        auth.admin.put('/api/v1/account').send({username: randomName}).end(done);
      });
      it('prevents another user to have that same name', function(done){
        auth.user.put('/api/v1/account').send({username: randomName}).expect(422, done);
      });
    });
  });
});
