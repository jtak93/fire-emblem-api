var auth = require('../../authenticated');
var should = require('chai').should();
var superagent = require('superagent');
var crypto = require('crypto');

var createOrder = null;
var updateOrder = function(id){
  return auth.admin
    .put('/api/v1/order/' + id)
    .type('form')
    .field('name', 'another name')
};
var reinitializeCreate = function(){
  createOrder = auth.admin
    .post('/api/v1/order')
    .send({
      name: 'my test order',
      desc: 'some description',
      coords: [40, 5],
      steps: [{ type: 'location'}]
    });
    return createOrder;
}
describe('OrderController', function(){
  describe('#create', function(){
    it('allows creations', function(done){
        reinitializeCreate().expect(201, done)
    });
  });
  describe('#read', function(){
    var orderId;
    before(function(done){
      reinitializeCreate().end(function(err, res){
        orderId = res.body._id;
        done();
      });
    })
    it('allows reading', function(done){
      auth.user.get('/api/v1/order/' + orderId).expect(200, done);
    });
    it('throws a 404 when no order found', function(done){
      auth.user.get(`/api/v1/order/${crypto.randomBytes(12).toString('hex')}`).expect(404, done);
    });
    it('throws a 404 when invalid order id', function(done){
      auth.user.get('/api/v1/order/asdf').expect(404, done);
    });
  });
  describe.skip('#update', function(){
    var orderId;
    before(function(done){
      reinitializeCreate().end(function(err, res){
        orderId = res.body._id;
        done();
      });
    });
    it('allows updates', function(done){
      auth.admin.put('/api/v1/order/' + orderId).send({name: 'new name'}).end(function(err, res){
        res.status.should.equal(200);
        res.body.name.should.equal('new name');
        done();
      });
    });
  });
  describe('#delete', function(){
    var orderId;
    before(function(done){
      reinitializeCreate().end(function(err, res){
        orderId = res.body._id;
        done();
      });
    });
    it('allows deletes', function(done){
      auth.admin.del('/api/v1/order/' + orderId).expect(204, done);
    });
  });
});
