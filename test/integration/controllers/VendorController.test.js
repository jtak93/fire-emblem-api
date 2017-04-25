var auth = require('../../authenticated');
var should = require('chai').should();
var superagent = require('superagent');
var crypto = require('crypto');

var createVendor = null;
var updateVendor = function(id){
  return auth.admin
    .put('/api/v1/vendor/' + id)
    .type('form')
    .field('name', 'another name')
    .attach('photos', 'test/fixtures/ffffff.png')
};
var reinitializeCreate = function(){
  createVendor = auth.admin
    .post('/api/v1/vendor')
    .send({
      name: 'my test vendor',
      desc: 'some description',
      coords: [40, 5],
      steps: [{ type: 'location'}]
    });
    return createVendor;
}
describe('VendorController', function(){
  describe('#create', function(){
    it('allows creations', function(done){
        reinitializeCreate().expect(201, done)
    });
    it('allows creations through multipart/form', function(done){
      auth.admin.post('/api/v1/vendor')
        .field('name', 'another name')
        .field('desc', 'multipart description')
        .field('coords[]', '40')
        .field('coords[]', '5')
        .attach('photos', 'test/fixtures/ffffff.png')
        .expect(201, done)
    })
  });
  describe('#read', function(){
    var vendorId;
    before(function(done){
      reinitializeCreate().end(function(err, res){
        vendorId = res.body._id;
        done();
      });
    })
    it('allows reading', function(done){
      auth.user.get('/api/v1/vendor/' + vendorId).expect(200, done);
    });
    it('throws a 404 when no vendor found', function(done){
      auth.user.get(`/api/v1/vendor/${crypto.randomBytes(12).toString('hex')}`).expect(404, done);
    });
    it('throws a 404 when invalid vendor id', function(done){
      auth.user.get('/api/v1/vendor/asdf').expect(404, done);
    });
  });
  describe('#update', function(){
    var vendorId;
    before(function(done){
      reinitializeCreate().end(function(err, res){
        vendorId = res.body._id;
        done();
      });
    });
    it('allows updates', function(done){
      auth.admin.put('/api/v1/vendor/' + vendorId).send({name: 'new name'}).end(function(err, res){
        res.status.should.equal(200);
        res.body.name.should.equal('new name');
        done();
      });
    });
    it('accepts updates in multipart', function(done){
      updateVendor(vendorId).end(function(err, res){
        res.status.should.equal(200)
        res.body.name.should.equal('another name');
        done();
      })
    })
  });
  describe('#delete', function(){
    var vendorId;
    before(function(done){
      reinitializeCreate().end(function(err, res){
        vendorId = res.body._id;
        done();
      });
    });
    it('allows deletes', function(done){
      auth.admin.del('/api/v1/vendor/' + vendorId).expect(204, done);
    });
  });
});
