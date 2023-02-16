const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const messageShema = new Schema({
    name : {
        type: String,
        required: true
    },
    room_id : {
        type: String,
        required: true
    },
    user_id : {
        type: String,
        required: true
    },
    text : {
        type: String,
        required: true
    }
},{timestamps:true});
const Message = mongoose.model('message',messageShema)
module.exports = Message;
