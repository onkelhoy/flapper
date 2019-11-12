const express = require('express');
const router = express.Router();
const UserModel = require('../../models/user');


router
  .post('/', async (req, res) => {
    const { email, password, } = req.body;

    // this should be adopted to a greater extent
    if (!(email && password && /^[\w.!_ ]*$/.test(email + password))) 
      return res.status(403).end('Forbidden charactures')

    try {
      const user = await UserModel.findOne({ email }).exec();
      if (!user) res.status(404).end('User not found');

      user.comparePassword(password, (err, hpass) => {
        if (err) res.status(500).end();

        const token = jwt.sign({email}, process.env.SECRET, {expiresIn: 60 * 60}); // 1 hour
        res.status(200).send(token);
      })
    }
    catch (error) {
      res.status(500).end();
    }
  })
  .post('/register', async (req, res) => {
    const { email, password, } = req.body;
    if (!(email && password && /^[\w.!_ ]*$/.test(email + password))) 
      return res.status(403).end('Forbidden charactures')

    const user = new UserModel({email, password});
    user.save(err => {
      if (err) res.status(500).end();
      res.status(201).end(); // created
    })
  });

module.exports = router;