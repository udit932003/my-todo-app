# My Todo App 📝

A full-stack Todo application built using React, Node.js, Express, and MySQL.  
This app allows users to create, view, and manage daily tasks with data stored in a MySQL database.

---

## 🚀 Tech Stack

### Frontend
- React.js
- Axios
- CSS

### Backend
- Node.js
- Express.js
- MySQL

### Database
- MySQL 8.0

---

## 📂 Project Structure

my-todo-app/
│
├── client/        # React Frontend  
├── server/        # Node + Express Backend  
└── README.md  

---

## ⚙️ Database Setup (Important)

Before running the project, create the database in MySQL:

```sql
CREATE DATABASE todo_db;

USE todo_db;

CREATE TABLE todos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  todos VARCHAR(255) NOT NULL
);
