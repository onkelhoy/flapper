const express = require('express');
const path = require('path');
const cors = require('cors');
const log = require('morgan');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const http = require('http');

dotenv.config();
const app = express();

// local modules 
const api = require('./api');
const server = http.createServer(app);

require('./websocket')(server);

// database connection
mongoose.connect(process.env.DB_URL, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('\x1b[36m%s\x1b[0m', 'connected to database')
})

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(log('dev'));

app.use(express.static('public'));
app.use('/bundle', express.static(path.resolve(__dirname, 'frontend/bundle')));

app.use('/api', api);
app.get('/', (req, res) => res.sendfile('/index.html'));
app.all('*', (req, res) => res.status(404).end());

app.set('port', process.env.SERVER_PORT);
server.listen(app.get('port'), () => console.log(`server is running on port ${app.get('port')}`));