import mongoose from 'mongoose';
import Todo from '../models/items.js';

export const readToDos = async (req, res) => {
    try {
        const todos = await Todo.find();
        console.log("todos " +todos);
        res.status(200).json({todos});
    } catch (error) {         
        res.status(404).json({error});
    }
    
}

export const createToDos = async (req, res) => {
    const createTodo = new Todo(req.body)
    console.log(createTodo);    
    try {        
        const todos = await createTodo.save();
        res.status(201).json(todos);
    } catch (error) { 
        console.log(error);        
        res.status(404).json({error});
    }    
}

export const updateToDos = async (req, res) => {
     
    console.log(req.body);
    try {        
        const todos = await Todo.findByIdAndUpdate(req.params.id, req.body);
        res.status(200).json(todos);
    } catch (error) { 
        console.log(error);        
        res.status(404).json({error});
    }    
}
export const deleteToDos = async (req, res) => {
    console.log(mongoose.Types.ObjectId.isValid(req.params.id));
    try {
        if(mongoose.Types.ObjectId.isValid(req.params.id)){
            const todos = await Todo.findByIdAndDelete(req.params.id);
            res.status(200).json(todos);
        }else {
            res.status(200).json([]);
        }        
    } catch (error) { 
        console.log(error);        
        res.status(404).json({error});
    }    
}