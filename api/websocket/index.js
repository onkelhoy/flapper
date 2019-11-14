const express = require('express');
const router = express.Router();

router.ws('/', (ws, req) => {
  ws.on('message', (msg) => {
    console.log('new message', msg);
  })

  ws.on('disconnect', (a) => {
    console.log('client disconnected', a);
  })
});

module.exports = router;