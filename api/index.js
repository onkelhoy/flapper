const express = require('express');
const jtw = require('jsonwebtoken');
const router = express.Router();


router.use('/', require('./auth'));
// access middleware check
router.use((req, res, next) => {
  const token = req.query.token;
  jtw.verify(token, process.env.SECRET, (err) => {
    if (err) res.status(403).end();
    else next();
  });
});

module.exports = router;