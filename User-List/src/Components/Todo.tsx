import React, { useState } from "react";

interface TodoProps {
  id: number;
  text: string;
  onUpdate: (id: number, newText: string) => Promise<void>;
  onDelete: (id: number) => Promise<void>;
}

const Todo: React.FC<TodoProps> = ({ id, text, onUpdate, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(text);

  // const handleSave = async () => {
  //   if (editValue.trim() && editValue.trim() !== text) {
  //     await onUpdate(id, editValue.trim());
  //   } else {
  //     setEditValue(text);
  //   }
  //   setIsEditing(false);
  // };
  const handleSave = async () => {
    if (!editValue.trim()) {
      alert("Todo cannot be empty");
      setEditValue(text);
      setIsEditing(false);
      return;
    }
  
    if (editValue.trim() !== text) {
      if (window.confirm("Are you sure you want to save this?")) {
        await onUpdate(id, editValue.trim());
      } else {
        setEditValue(text); // revert to original if user cancels
      }
    } else {
      setEditValue(text);
    }
    setIsEditing(false);
  };
  
  const handleCancel = () => {
    setEditValue(text);
    setIsEditing(false);
  };

  return (
    <div className="todo-card">
      {isEditing ? (
        <div className="todo-card-body todo-edit">
          <input
            type="text"
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSave();
              if (e.key === "Escape") handleCancel();
            }}
            autoFocus
          />
          <div className="todo-card-actions">
            <button type="button" onClick={handleSave} className="btn-save">
              Save
            </button>
            <button type="button" onClick={handleCancel} className="btn-cancel">
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <>
          <div className="todo-card-body">
            <span className="todo-text">{text}</span>
          </div>
          <div className="todo-card-actions">
            <button
              type="button"
              onClick={() => setIsEditing(true)}
              className="btn-edit"
            >
              Edit
            </button>
            <button
              type="button"
              onClick={() => {
                if (window.confirm("Are you sure you want to delete this?")) {
                  onDelete(id);
                }
              }}
              className="btn-delete"
            >
              Delete
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Todo;
