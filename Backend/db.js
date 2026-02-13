import mysql from 'mysql2';
// NOTE: Prefer putting these in a `.env` file.
const db = mysql.createPool({
    host: process.env.DB_HOST ?? 'localhost',
    user: process.env.DB_USER ?? 'root',
    password: process.env.DB_PASSWORD ?? 'Cashify@321',
    database: process.env.DB_NAME ?? 'todo_db'
});
export default db;
