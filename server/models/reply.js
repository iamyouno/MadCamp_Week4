var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var replySchema = new Schema({
    user_id: String,
    roomNum: Number,
    text: String    
});

module.exports = mongoose.model('reply', replySchema);