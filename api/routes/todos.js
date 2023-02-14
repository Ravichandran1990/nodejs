import express from "express";
import {readToDos, createToDos, updateToDos, deleteToDos} from '../controller/todos.js'
const router = express.Router();
router.get('/', readToDos);
router.post('/', createToDos);
router.patch('/:id', updateToDos);
router.delete('/:id', deleteToDos);

export default router;