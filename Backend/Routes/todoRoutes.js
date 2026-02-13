// todo model routes mai import hoga
import { Router } from 'express';
import { deleteTodos, getTodos, saveTodos, updateTodos } from '../Controller/todoController.js';
const router = Router();
router.get('/get', getTodos);
router.post('/save', saveTodos);
router.put('/update/:id', updateTodos);
router.delete('/delete/:id', deleteTodos);
export default router;
