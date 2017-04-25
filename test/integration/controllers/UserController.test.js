var auth = require('../../authenticated');
var should = require('chai').should()
var crypto = require('crypto');

describe('UserController', function(){
  describe('#read', function(){
    it('returns a list of users with admin access', function(done){
      auth.admin.get('/api/v1/user').end(function(err, res){
        res.status.should.equal(200);
        res.body.should.be.an.Array;
        done();
      });
    });
    describe.skip('when querying for other user', function(){
      var adminId = null;
      it('does not display the deviceToken for other users', function(done){
        auth.user.get('/api/v1/user/' + adminId).end(function(err, res){
          res.body.should.include.keys('facebookId')
          res.body.should.not.include.keys('deviceToken');
          done();
        });
      });
      it('returns 404 when invalid username provided', function(done){
        auth.user.get('/api/v1/user/' + crypto.randomBytes(12).toString('hex')).expect(404, done);
      });
    });
  });
});
