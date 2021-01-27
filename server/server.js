const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const app = express();
app.use(cors({credentials: true, origin: 'http://192.249.18.133:3000'}));
app.use(bodyParser.urlencoded({extended: true, limit: '50mb'}));
app.use(bodyParser.json({limit: '50mb'}));
app.use(cookieParser());
const mongoose = require('mongoose')


const api = require('./routes/index');
app.use('/api', api);

const port = 3002;
app.listen(port, ()=>console.log(`Listening on port ${port}`));

var db = mongoose.connection;
db.on('error', console.error);
db.once('open', function(){
    // CONNECTED TO MONGODB SERVER
    console.log("Connected to mongod server");
});

mongoose.connect('mongodb://localhost/Madcamp_Week4');

var Freeboard= require('./models/freeboard');
var freeboardroute = require('./routes/freeboard_main')(app, Freeboard);

var User = require('./models/user');
var userroute = require('./routes/user_main')(app, User);