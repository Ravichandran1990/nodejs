const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userShema = new Schema({
    name : {
        type: String,
        required: true
    },
    email : {
        type: String,
        required: [true, 'User email id required'],
        unique: true
    },
    password: {
        type: String,
        required: true 
    }
},{timestamps:true});
userShema.statics.login = async function(req) {
    const user = await this.findOne({email:req.email});
    console.log("user "+user);
    if(user) {
        if(req.password !== user.password) {
            throw Error("Incorrect Password");    
        }
        return user;
    }else {
        throw Error("Incorrect Email");
    }
}
const User = mongoose.model('user',userShema)
module.exports = User;
