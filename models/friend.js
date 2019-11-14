const mongoose = require('mongoose');

const Schema = mongoose.Schema;
mongoose.Promise = Promise;

const FriendSchema = new Schema({
  friends: [{type: mongoose.Types.ObjectId, ref: 'users'}],
  yourscore: {type: Number},
  friendscore: {type: Number},
  wins: {type: Number},
  games: {type: Number}, 
  status: String,
  creator: String,
});

module.exports = mongoose.model('friends', FriendSchema);

