/**********************************************************
 *****       test SERVER          ***********************
 **********************************************************
 */

const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '.env') });

const express = require('express');
const socketIO = require('socket.io');
const http = require('http');
const bodyParser = require('body-parser');

const cors = require('cors');
const mongoose = require('mongoose');

mongoose.set('useFindAndModify', false);

mongoose.connect(
  `mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`,
  { useNewUrlParser: true, useUnifiedTopology: true }
);

const app = express();
const server = http.Server(app);
const io = socketIO(server);
app.use(express.json());
app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.options('*', cors());

//APP PORT

server.listen(8888, () => {
  console.log('Server has been started!');
});
