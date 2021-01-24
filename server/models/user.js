var mongoose = require('mongoose')
var Schema = mongoose.Schema
var userSchema = new Schema({
    user_id: String,
    user_name: String,
    user_pw: String
});
module.exports = mongoose.model('User', userSchema); // when call module by require, this function is executed.