// MODEL SE SIRF QUERY DALTE H
// Database se data lena, dena, update karna, delete karna
import db from '../db.js';
export const find = async () => {
    const [rows] = await db.promise().query('SELECT * FROM todos');
    return rows;
};
export const create = async (todos) => {
    const [result] = await db
        .promise()
        .query('INSERT INTO todos (todos) VALUES (?)', [todos]);
    return result;
};
export const update = async (id, todos) => {
    const [result] = await db
        .promise()
        .query('UPDATE todos SET todos = ? WHERE id = ?', [todos, id]);
    return result;
};
export const remove = async (id) => {
    const [result] = await db
        .promise()
        .query('DELETE FROM todos WHERE id = ?', [id]);
    return result;
};
