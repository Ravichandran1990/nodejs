const User = require("../models/user");
const jwt = require('jsonwebtoken');
const maxAge = 1 * 24 * 60 * 60;
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
        res.status(400).json(error);
    })
     
}
module.exports.login = async (req,res) => {
    console.log(req.body);
    try{
        console.log(req.body);
        const user = await User.login(req.body);
        const token = createJwt(user._id);
        res.cookie('jwt',token, {httpOnly:true,maxAge:maxAge * 1000});
        res.status(201).json({user});
    }catch(error) {
        res.status(400).json({error});
    }
    
}
module.exports.verifyUser = (req,res,next) => {
    const token = req.cookies.jwt;
    if(token){
        jwt.verify(token,'ravichandran', async (err, decodedToken) => {
            console.log(decodedToken);
            if(err){
                console.log(err.message);
            }else{
                let user = await User.findById(decodedToken.id);
                res.status(200).json({user});
                 
            }
        })
    }else{
        next();
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