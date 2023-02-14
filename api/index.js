import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
//import Todo from './models/items.js';
import router from './routes/todos.js';
const app = express();
dotenv.config();
app.use(express.json({extended:true}));
app.use(express.urlencoded({extended:true}));
app.use(cors());
app.use('/todos', router);
// const mongodb = "mongodb+srv://test:test@cluster0.dtsmogk.mongodb.net/tododb?retryWrites=true&w=majority";
const mongodb = "mongodb://test:test@ac-jmmquhe-shard-00-00.dtsmogk.mongodb.net:27017,ac-jmmquhe-shard-00-01.dtsmogk.mongodb.net:27017,ac-jmmquhe-shard-00-02.dtsmogk.mongodb.net:27017/tododb?ssl=true&replicaSet=atlas-6i9fnd-shard-0&authSource=admin&retryWrites=true&w=majority";
mongoose.set('strictQuery', false);
const PORT = process.env.PORT || 5000;
mongoose.connect(mongodb, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => 
{
    console.log("connected");
    app.listen(5000);
}).catch(err => {
    console.log(err);
});

// app.get('/', (req,res) => {
//     Todo.find().then((result) => {
//         res.json(result)
//     })
// });