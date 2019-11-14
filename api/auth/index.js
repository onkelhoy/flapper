const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const UserModel = require('../../models/user');

router
  .post('/login', async (req, res) => {
    const { username, password, } = req.body;

    // this should be adopted to a greater extent
    if (!(username && password && /^[\w.!_ ]*$/.test(username + password))) 
      return res.status(403).json({error: 'Forbidden charactures'})

    try {
      const user = await UserModel.findOne({ username }).exec();
      if (!user) res.status(404).json({error: 'User not found'});

      user.comparePassword(password, (err, result) => {
        if (err || !result) return res.status(500).json({error: true});

        const token = jwt.sign({username}, process.env.SECRET, {expiresIn: 60 * 60}); // 1 hour
        const data = {token, user}
        delete data.user.password;
        
        res.status(200).json(data);
      })
    }
    catch (error) {
      res.status(500).json({error: true});
    }
  })
  .post('/register', async (req, res) => {
    const { username, password, } = req.body;

    if (!(username && password && /^[\w.!_ ]*$/.test(username + password))) 
      return res.status(403).json({error: 'Forbidden charactures'})

    const user = new UserModel({username, password});
    user.save(err => {
      if (err) {
        res.status(500).json({error: true});
        console.error(err);
      }
      else res.status(201).json({success: true}); // created
    })
  });

module.exports = router;