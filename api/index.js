const express = require('express');
const jtw = require('jsonwebtoken');
const router = express.Router();


router.use('/', require('./auth'));
// access middleware check
router.use((req, res, next) => {
  const {token} = req.body;
  jtw.verify(token, process.env.SECRET, (err) => {
    if (err) res.status(403).json({error: true});
    else next();
  });
});

router.post('/auth', (req, res) => res.status(200).json({success: true}));

router.use('/friend', require('./friend'));

router.use('/ws', require('./websocket'))

module.exports = router;