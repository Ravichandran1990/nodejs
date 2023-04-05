const User = require("../models/user");
const jwt = require('jsonwebtoken');
const maxAge = 1 * 24 * 60 * 60;
// const maxAge = 1 * 60;
const createJwt = (id) => {
    return jwt.sign({id},'ravichandran', {
        expiresIn: maxAge
    });
}


module.exports.signup = (req,res) => {
    console.log(req.body);
    const user= new User(req.body)
    user.save().then((result) => {
        const token = createJwt(result._id);
        res.cookie('jwt',token, {httpOnly:true,maxAge:maxAge * 1000});
        res.status(201).json({user:result});
    }).catch((error) => {
        if(error.code === 11000){
            res.status(400).json({error:"Emailid already exsist"});
            return;
        }
        res.status(400).json(error);
    })
     
}
module.exports.userlist = async (req,res) => {
    const userlistData = await User.find();
    try {
        res.status(200).json({userlistData});
    } catch (error) {
        res.status(400).json({error});
    }
}
module.exports.login = async (req,res) => {
    console.log(req.body);
    try{
        console.log(req.body);
        const user = await User.login(req.body);
        if(user.error){
            console.log(user.error);
            res.status(400).json({error:user.error});
            return;
        }
        const token = createJwt(user._id);
        res.cookie('jwt',token, {httpOnly:true,maxAge:maxAge * 1000});
        res.status(201).json({user});
    }catch(error) {
        console.log(error.message);
        res.status(400).json({error:error.message});
    }
    
}
module.exports.verifyUser = (req,res,next) => {
    const token = req.cookies.jwt;
    if(token){
        jwt.verify(token,'ravichandran', async (err, decodedToken) => {
            console.log(decodedToken);
            if(err){
                console.log(err.message);
                res.status(200).json({err:err});
            }else{
                console.log("Verify User data "+decodedToken.id);
                let user = await User.findById(decodedToken.id);
                res.status(200).json({user});
            }
        })
    }else{
        res.status(200).json({error:"Token not valid"});
    }
}
module.exports.logout = (req,res) => {
    res.cookie('jwt',"",{maxAge:1})
    res.json({logout: "logout successfully"})
}

const autherrors = (error) => {
    console.log(error);
    return error;
}