const { timeStamp } = require('console');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const itemShema = new Schema({
    name : {
        type: String,
        required: true
    },
    price : {
        type: Number,
        required: true
    },
    updated : {
        type: Date,
        require: false
    }
},{timestamps:true});
const Item = mongoose.model('items',itemShema)
module.exports = Item;
