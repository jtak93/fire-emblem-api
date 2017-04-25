var User = require('../models/user-model');

module.exports = function(){
  var users = Array.prototype.slice.call(arguments);
  require('../config').auth.basic = {
    name: 'Basic', // only used for tests
    strategy: require('passport-http').BasicStrategy,
    options: function(userid, password, done){
      if (users.indexOf(userid) == -1) return done(null, false)

      // passport.js also uses facebookId to find the user.
      var facebookId = 'facebookIdPlaceholder-' + userid;
      User.findOne({facebookId: facebookId}, function(err, user){
        if (err) return done(err);
        if (user) return done(err, user);

        user = new User({
          name: userid,
          email: userid + '@eventmakr.com',
          username: userid,
          provider: 'facebook',
          facebookId: facebookId
        });
        user.save(function(err){
          return done(err, user);
        })
      });
    }
  };
}
