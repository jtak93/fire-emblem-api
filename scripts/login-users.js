// login the various users, including admin and store their sessions

var users = require('./data/users');
var supertest = require('supertest')
module.exports = function(app, cb){
  var sessions = {}
  Object.keys(users).forEach( function(user){
    var session = supertest.agent(app);
    session.get('/api/auth/basic').auth(user, 'blah').end(function(err, res){
      console.log(err, res.status)
      sessions[user] = session
      if (Object.keys(users).length === Object.keys(sessions).length){
        cb(sessions)
      }
    })
  });
}
