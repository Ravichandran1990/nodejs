const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const roomShema = new Schema({
    name : {
        type: String,
        required: true
    }
},{timestamps:true});
const Room = mongoose.model('rooms',roomShema)
module.exports = Room;
