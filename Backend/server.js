import 'dotenv/config';
import cors from 'cors';
import express from 'express';
// In TS (NodeNext/ESM), import the emitted `.js` paths.
import db from './db.js';
import todoRoutes from './Routes/todoRoutes.js';
const app = express();
const PORT = process.env.PORT ? Number(process.env.PORT) : 5000;
app.use(express.json());
app.use(cors());
// Check DB connection
db.getConnection((err, connection) => {
    if (err) {
        console.error('❌ MySQL connection failed:', err);
        return;
    }
    console.log('✅ MySQL connected');
    connection.release();
});
app.use('/api', todoRoutes);
app.listen(PORT, () => console.log(`Listening at ${PORT} ...`));
