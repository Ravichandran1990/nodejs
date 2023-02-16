const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
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
    //Verify Hash Password
    // const salt = await await bcrypt.genSalt();
    const isPassword = await bcrypt.compare(req.password, user.password);
    console.log("user "+user);
    try{
        if(user) {
            if(!isPassword) {
                throw Error("Incorrect Password");    
            }
            return user;
        }else {
            throw Error("Incorrect Email");
        }
    }catch(error) {
        return {error:error.message};
    }
    
}

userShema.pre('save', async function() {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    console.log("pre save "+ this);
     
});
userShema.post('save', async function(){
    console.log("Post Save "+this);
     
});
const User = mongoose.model('user',userShema)
module.exports = User;
