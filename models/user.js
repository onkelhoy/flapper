const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const Schema = mongoose.Schema;
mongoose.Promise = Promise;

const { safeTextValidation } = require('./validation');

const UserSchema = new Schema({
  username: { type: String, required: true, unique: true, validate: [safeTextValidation, 'Provide a username!']},
  password: { type: String, required: true, },
  friends: [{type: Schema.ObjectId, ref: 'user'}],
  scores: []
});

UserSchema.pre('save', (next) => {
  const user = this;
  bcrypt.genSalt((err, salt) => {
    if (err) return next(err);

    bcrypt.hash(user.password, salt, (err, hash) => {
      if (err) return next(err);

      user.password = hash;
      next();
    });
  });
});

UserSchema.methods.comparePassword = function (cpass, callback) {
  bcrypt.compare(cpass, this.password, callback);
};

module.exports = mongoose.model('user', UserSchema);

