const express = require('express');
const mongoose = require('mongoose');
const Item = require('./models/items')
const app = express(); //136.226.252.244/32
app.use(express.urlencoded({extended:true}));
// const { MongoClient, ServerApiVersion } = require('mongodb');
const mongodb = "mongodb+srv://<username>:<password>@cluster0.dtsmogk.mongodb.net/itemdb?retryWrites=true&w=majority";
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
    app.listen(3000);
}).catch(err => {
    console.log(err);
});
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