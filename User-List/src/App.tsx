import React, { useState, useEffect } from "react"; // useState se data store hota h  or bakiyo se useeffect se Api call
import axios from "axios"; // ye backend se bt kerne ke liye h
import Todo from "./Components/Todo";
import "./App.css";

const API_URL = "http://localhost:5000/api";

interface TodoItem {
  id: number;
  todos: string;
}

const App = () => {
  const [todos, setTodos] = useState<TodoItem[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchTodos = async () => {
    setLoading(true);
    setError("");
    try {
      const { data } = await axios.get<TodoItem[]>(`${API_URL}/get`);
      setTodos(data);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Failed to fetch todos";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []); //render hone se phele call tabhi isko empty kia h

  // const addTodo = async (e: React.FormEvent) => {
  //   e.preventDefault();
  //   if (!inputValue.trim()) return;
  //   setError("");
  //   try {
  //     await axios.post(`${API_URL}/save`, { todos: inputValue });
  //     setInputValue("");
  //     fetchTodos();
  //   } catch (err: unknown) {
  //     const msg = err instanceof Error ? err.message : "Failed to add todo";
  //     setError(msg);
  //   }
  // };
  const addTodo = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) {
      alert("Please add some value");
      return;
    }
    setError("");
    try {
      await axios.post(`${API_URL}/save`, { todos: inputValue });
      setInputValue("");
      fetchTodos();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Failed to add todo";
      setError(msg);
    }
  };
  

  const updateTodo = async (id: number, newText: string) => {
    setError("");
    try {
      await axios.put(`${API_URL}/update/${id}`, { todos: newText });
      fetchTodos();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Failed to update todo";
      setError(msg);
    }
  };

  const deleteTodo = async (id: number) => {
    setError("");
    try {
      await axios.delete(`${API_URL}/delete/${id}`);
      fetchTodos();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Failed to delete todo";
      setError(msg);
    }
  };

  return (
    <main className="app">
      <header className="header">
        <div className="header-content">
          <a
            href="https://www.cashify.in"
            target="_blank"
            rel="noopener noreferrer"
            className="logo-link"
          >
            <img
              src="/cashify-logo1.svg"
              alt="Cashify"
              className="header-logo"
            />
          </a>
          {/* <h1>
            CASHIFY <span>Todo App</span>
          </h1> */}

          <div className="header-text">
            <h1>Todo App</h1>
            {/* <p>Manage your tasks smartly</p> */}
          </div>
        </div>
      </header>

      <div className="container">
        <form className="input-card" onSubmit={addTodo}>
          <div className="input-wrapper">
            <span className="input-icon">📝</span>
            <input
              type="text"
              placeholder="Add a new todo..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
          </div>
          <button type="submit">+ Add Todo</button>
        </form>

        {error && <p className="error">{error}</p>}

        <div className="list">
          {loading ? (
            <p className="loading">Loading todos...</p>
          ) : todos.length === 0 ? (
            <p className="empty">No todos yet. Add one above!</p>
          ) : (
            todos.map((todo) => (
              <Todo
                key={todo.id}
                id={todo.id}
                text={todo.todos}
                onUpdate={updateTodo}
                onDelete={deleteTodo}
              />
            ))
          )}
        </div>
      </div>
    </main>
  );
};

export default App;

// fetch() example
// fetch("/api/get")
//   .then(res => res.json())
//   .then(data => console.log(data));
//axios simple with example
// axios.get("/api/get")
//   .then(res => console.log(res.data));
