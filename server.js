const express = require('express');
const path = require('path');
const cors = require('cors');
const log = require('morgan');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// local modules 
const api = require('./api');

dotenv.config();
const app = express();

// database connection
mongoose.connect(process.env.DB_URL, { useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

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
app.listen(app.get('port'), () => console.log(`server is running on port ${app.get('port')}`));