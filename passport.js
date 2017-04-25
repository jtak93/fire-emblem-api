var passport = require('passport');
var fb = require('passport-facebook').Strategy;
var fbToken = require('passport-facebook-token').Strategy;
var config = require('./config');
var User = require('./models/user-model');

module.exports.configure = function(){
  for (var auth in config.auth){
    var Strategy = config.auth[auth].strategy;
    var options = config.auth[auth].options
    passport.use(new Strategy(options, function(accessToken, refreshToken, profile, done){
      User.findOne({facebookId: profile.id}, function(err, user){
        if (err) return done(err);
        if (user) return done(err, user);
        user = new User({
          name: profile.displayName,
          username: profile.username,
          provider: 'facebook',
          facebookId: profile.id
        });
        user.save(function(err){
          return done(err, user);
        });
      })
    }));
  }
  passport.serializeUser(function(user, done) {
    done(null, user._id);
  });

  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });
};
