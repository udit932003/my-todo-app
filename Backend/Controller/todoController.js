import * as todosModel from '../Model/todoModel.js';
// getTodo todo ka mtlb h Read
export const getTodos = async (_req, res) => {
    try {
        // 1. Model se data mangwana
        const todos = await todosModel.find(); // Model se saare todos laa raha hai
        // Client ko data bhejna JSON me
        res.json(todos); // Client ko JSON me bhej raha hai
    }
    catch (err) {
        console.error(err);
        const message = err instanceof Error ? err.message : 'Unknown error';
        res.status(500).json({ message });
    }
};
// saveTodo todo ka mtlb h Create
export const saveTodos = async (req, res) => {
    try {
        const { todos } = req.body; // Client ne jo todo bheja body me, use le raha hai
        await todosModel.create(todos); // Model ke through DB me save kar raha hai
        console.log('Todos saved successfully');
        res.status(201).json({ message: 'Todo saved successfully' });
    }
    catch (err) {
        console.error(err);
        const message = err instanceof Error ? err.message : 'Unknown error';
        res.status(500).json({ message });
    }
};
// updatetodo ka mtlb h Update
export const updateTodos = async (req, res) => {
    try {
        const { id } = req.params; // URL se id nikaal raha hai
        const { todos } = req.body; // Naya todo data body se le raha hai
        await todosModel.update(id, todos); // Model se update DB me kar raha hai
        res.status(200).json({ message: 'Todo updated successfully' });
    }
    catch (err) {
        console.error(err);
        const message = err instanceof Error ? err.message : 'Unknown error';
        res.status(500).json({ message });
    }
};
// delete ka mtlb delete he hota h
export const deleteTodos = async (req, res) => {
    try {
        const { id } = req.params;
        await todosModel.remove(id);
        res.status(200).json({ message: 'Todo deleted successfully' });
    }
    catch (err) {
        console.error(err);
        const message = err instanceof Error ? err.message : 'Unknown error';
        res.status(500).json({ message });
    }
};
// find,create ye sabh model function h Model functions directly database ke saath interact karte hain.
// getTodo , saveTodo , updateTodo ye sabh controller function h HTTP requests ko handle karte hain.
