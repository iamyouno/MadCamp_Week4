var express = require('express');
var app = express();
var bodyParser  = require('body-parser');
var mongoose = require('mongoose');
var cors = require('cors');

var uri = "mongodb://localhost:27017/cobuying";
mongoose.connect(uri, {useUnifiedTopology: true, useNewUrlParser: true});

const connection = mongoose.connection;
connection.once("open", function(){
    console.log("Mongo success");
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

var port = process.env.PORT || 8080;

var cobuying = require('./models/cobuying');

var router_cobuying = require('./routes/cobuyingRoutes')(app, cobuying);

var server = app.listen(port, function () {
    console.log("connect");
});