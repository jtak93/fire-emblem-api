var mongoose = require('mongoose');
var mockgoose = require('mockgoose');
var S3rver = require('s3rver')
var s3rver = new S3rver()
var path = require('path')
var rimraf = require('rimraf');
var mkdirp = require('mkdirp');

mockgoose(mongoose, {port: 27018});
var User = require('../models/user-model');

// add basic auth to passport just for test users to obtain user session
require('./bypass-auth')('testuser', 'testadmin')

var superagent = require('supertest');
var app = require('../app');
var authenticated = require('./authenticated');

before(function(done) {
  this.timeout(10000)
  // set up fake s3 server
  var userCreated = adminCreated = serverUp = false;
  s3rver
    .setHostname('localhost')
    .setPort(4568)
    .setDirectory(path.resolve(__dirname, 'fixtures/.tmp'))
    .setSilent(true)
    .run(function (err, host, port) {
      if(err) return done(err);
      mkdirp(path.resolve(__dirname, 'fixtures/.tmp/eventmakr-vendors'), function(){
        serverUp = true
        if (userCreated && adminCreated && serverUp) done()
      });

    });

  // create user accounts
  // create an authenticated request for fresh user for tests
  authenticated.user = superagent.agent(app);
  authenticated.user.get('/api/auth/basic').auth('testuser', 'blah').end(function(){
    userCreated = true;
    if (userCreated && adminCreated && serverUp) done()
  });
  require('../models/auth-model').admins['facebookIdPlaceholder-testadmin'] = 'testadmin'; // store the admin in policies for tests
  authenticated.admin = superagent.agent(app)
  authenticated.admin.get('/api/auth/basic').auth('testadmin', 'blah').end(function(){
    adminCreated = true;
    if (userCreated && adminCreated && serverUp) done()
  });
});

after(function(done){
  rimraf(path.resolve(__dirname, 'fixtures/.tmp/some-bucket'), done);
})
