// src/components/AddTask.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";

const AddTask = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();

  const handleAddTask = async () => {
    try {
      const userId = localStorage.getItem("userId");
      await api.post("/tasks", { title, description, userId });
      navigate("/task-page");
    } catch (error) {
      console.error("Error adding task:", error.message);
    }
  };

  return (
    <div>
      <h2>Add Task</h2>
      <label>Title:</label>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <label>Description:</label>
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button onClick={handleAddTask}>Add Task</button>
    </div>
  );
};

export default AddTask;
