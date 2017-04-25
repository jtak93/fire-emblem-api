var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.ObjectId;
var passportLocalMongoose = require('passport-local-mongoose');

var userSchema = new mongoose.Schema({
  username             : { type: String, unique: true, sparse: true },
  facebookId           : { type: String, unique: true, index: true },
  firebaseId           : { type: String, unique: true, index: true },
  name                 : { type: String },
  photo                : { type: String },
  phone                : { type: String },
  customer_id          : { type: String }, // stripe customer id
  roles                : { type: [String] },
  email                : { type: String, unique: true },
  settings             : { type: Object },
  resetPasswordToken   : { type: String },
  resetPasswordExpires : { type: Date }
}, {autoIndex: false})

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', userSchema);
