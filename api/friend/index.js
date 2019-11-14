const express = require('express');
const router = express.Router();
const UserModel = require('../../models/user');
const FriendModel = require('../../models/friend');

const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

router.post('/search/:query', async (req, res) => {
  const { query } = req.params;

  console.log(query);
  
  try {
    const users = await UserModel.find({ username: { "$regex": query, "$options": "i" } }).exec();
    console.log(users);
    res.status(200).json(users);
  }
  catch (error) {
    console.log(error);
    res.status(500).json({error: true});
  }
});

router.post('/add', async (req, res) => {
  const { me, friend } = req.body;
  const _friend = new FriendModel({
    friends: [ObjectId(me), ObjectId(friend)],
    status: 'pending',
    creator: me,
    yourscore: 0,
    friendscore: 0,
    wins: 0,
    games: 0, 
  });

  _friend.save(err => {
    if (err) {
      res.status(500).json({error: true});
      console.error(err);
    }
    else res.status(201).json({success: true}); // created
  })
});

router.post('/accept/:id', async (req, res) => {
  const { id } = req.params;
  
  try {
    FriendModel.findOneAndUpdate({_id: ObjectId(id)}, { $set: {status: 'offline'}}, {new: true}, (err, doc) => {
      if (err) res.status(500).json({error: true});
      else res.status(200).json({success: true});
    });
  }
  catch (e) {
    res.status(500).json({error: true});
  } 
});

router.post('/:userid', async (req, res) => {
  console.log('getting friends')
  const { userid } = req.params;

  try {
    const friends = await FriendModel.find({friends: ObjectId(userid)}).populate('friends', '-password', UserModel).exec();
    res.status(200).json(friends);
  }
  catch (e) {
    console.log(e);
    res.status(500).json({error: true});
  }
});

module.exports = router;