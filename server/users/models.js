'use strict';
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const UserSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  locations: [{name: String, id: Number}],
  metric: {type: Boolean, default: false}
});

UserSchema.methods.serialize = function() {
  return {
    id: this._id,
    username: this.username || '',
    locations: [{}],
    metric: false
  };
};

UserSchema.methods.validatePassword = function(password) {
  return bcrypt.compare(password, this.password);
};

UserSchema.statics.hashPassword = function(password) {
  return bcrypt.hash(password, 4);
};

const User = mongoose.model('User', UserSchema);

module.exports = {User};