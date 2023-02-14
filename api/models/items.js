 
import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const todoShema = new Schema({
    name : {
        type: String,
        required: true
    },
    description : {
        type: String,
        required: true
    },
    updated : {
        type: Date,
        require: false
    }
},{timestamps:true});
const Todo = mongoose.model('todo',todoShema)
export default Todo;
