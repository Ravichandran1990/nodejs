const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const corsOption = {
    origin: "https://react-production-c683.up.railway.app",
    credentials: true,
    optionSuccessStatus:200
};

const User = require('./models/user');
const Item = require('./models/items');
const Room = require('./models/rooms');
const Message = require('./models/message');
const {addUser,getUser,removeUser} = require('./helper')

const app = express(); //136.226.252.244/32

const routes = require('./routes/authRoutes');

app.use(cors(corsOption));
app.use(cookieParser());
app.use(express.urlencoded({extended:true}));
app.use(express.json({extended:true})); //pass the request to body json
app.use(routes);

const http = require('http').createServer(app);
const socketio = require('socket.io'); 
const io = socketio(http);

const PORT = process.env.PORT || 5000;
// const { MongoClient, ServerApiVersion } = require('mongodb');
const mongodb = "mongodb+srv://test:test@cluster0.dtsmogk.mongodb.net/itemdb?retryWrites=true&w=majority";
// const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
// client.connect(err => {
//     const collection = client.db("test").collection("devices");
//     // perform actions on the collection object
//     client.close();
//   });
mongoose.set('strictQuery', false);
mongoose.connect(mongodb, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => 
{
    console.log("connected");
    // app.listen(5000);
    http.listen(PORT);
}).catch(err => {
    console.log(err);
});
//Setcookie
app.get('/set-cookies', (req, res) => {
    res.cookie('UserName', "Ravichandran");
    res.cookie('isAuthendicated', true);
    res.send("cookies set");
})

app.set('view engine', 'ejs')

app.get('/create-item', (req,res) => {
    const item = new Item({
        name: 'laptop',
        price: 1000,
        updated: new Date()
    });
    item.save().then(result => {
        res.render('index', {items: [...result]});
        //res.send(result)
    });
});
app.get('/', (req,res) => {
    // res.sendFile('./views/index.html', {root: __dirname}) // set without ejs file
    // res.render('index', {title2: 'Title2 here'});
    // const items = [{
    //     name:'mobile phone',
    //     price: 1000
    // },{
    //     name:'laptop',
    //     price: 2000
    // }]
    //res.render('index', {items});
    res.redirect('/get-items');
});
app.get('/get-items', (req, res) => {
    Item.find().then((result) => {
        res.render('index', {items: result});
    }).catch(err => console.log(err));
    
});
app.get('/addItem', (req,res) => {
    res.render('add-item'); 
});
app.post('/items', (req,res) => {
    console.log(req.body);
    Item(req.body).save().then((result) => {
        res.redirect('/get-items');
    }).catch(err => {
        console.log(err);
    })
});

app.get('/items/:id', (req, res) => {
    // console.log(req.params.id);
    Item.findById(req.params.id).then((result) => {
         res.render('item-detail', {item: result})
    });
});

app.put('/items/:id', (req, res) => {
    // console.log(req.params.id);
    Item.findByIdAndUpdate(req.params.id, req.body).then((result) => {
        res.json({redirect:'/get-items'});
    });
});

app.delete('/items/:id', (req, res) => {
    console.log("Delete src");
    console.log(req.params.id);
    Item.findByIdAndDelete(req.params.id).then((result) => {
         console.log(result);
         res.json({redirect:'/get-items'});
    }).catch(err => console.log(err));
});

app.use((req,res) => {
    // res.sendFile('./views/404.html', {root: __dirname})
    res.render('404');
});

//Socket Script
io.on('connection', (socket) => {
    console.log('Socket Connected server side '+socket.id);
    Room.find().then((result) => {
        socket.emit("roomList", result);
    });

    // socket.on('verifyLogin', (obj, callback) => {
    //     SignUp.findOne({email: obj.email}, (error, user) => {
    //         console.log("Error "+error);
    //     })
    // });

    // socket.on('signUpData', (signupObj, callback) => {
    //     const data = new SignUp(signupObj);
    //     data.save().then((result) => {
    //         console.log("signUp "+result);
    //         callback();
    //     })
    // });
    
    
    socket.on('createRoom', name => {
        console.log("The room name is" + name);
        const createRoom = new Room({name});
        createRoom.save().then(result => {
            socket.emit("roomCreated", result);
        });
    });
    socket.on('join', (addUserObj) => {
        const obj = JSON.parse(addUserObj);
        //console.log(addUserObj);
        const {error, user} = addUser({...obj,socket_id:socket.id});
        socket.join(obj.room_id);
        if(error) {
            console.log("Join Erro "+error);
        }else {
            console.log("Join user "+ user);
        }
        console.log("Join Socket Id" +socket.id);
    });
    socket.on('sendmessage', (message, room_id, user_id, callback) => {
        console.log("sendmessage Socket Id read"+socket.id); 
         const user = getUser(room_id, user_id);
        // console.log("getUser Data "+user);
        if(user) {
         const mesgToClient = {...user,text:message};
         const messageData = new Message(mesgToClient);
         messageData.save().then((result) => {
            io.to(room_id).emit('message', result);
            console.log("Message saved " +result.text);
            // socket.emit('message', result);
         })
        }                  
        callback();
    });

    socket.on('disconnect', () => {
        console.log("Disconnect "+socket.id);
        const user = removeUser(socket.id);
    })
})