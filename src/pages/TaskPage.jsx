// src/components/TaskList.js
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom"; // Заменяем useHistory на useNavigate
import api from "../api";

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const navigate = useNavigate(); // Используем useNavigate

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await api.get("/tasks");
        setTasks(response.data);
      } catch (error) {
        console.error("Error fetching tasks:", error.message);
      }
    };

    fetchTasks();
  }, []);

  const handleDeleteTask = async (taskId) => {
    try {
      console.log("Deleting task with ID:", taskId);
      const userId = localStorage.getItem("userId");
      await api.delete(`/users/${userId}/tasks/${taskId}`);
      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
      console.log("Task deleted successfully!");
    } catch (error) {
      console.error("Error deleting task:", error.message);
    }
  };
  const handleLogout = () => {
    localStorage.removeItem("userId");
    navigate("/login");
  };

  const handleToggleComplete = async (taskId, isCompleted) => {
    try {
      const userId = localStorage.getItem("userId");
      await api.put(`/users/${userId}/tasks/${taskId}`, {
        isCompleted: !isCompleted,
      });
      const response = await api.get("/tasks");
      setTasks(response.data);
    } catch (error) {
      console.error("Error toggling completion status:", error.message);
    }
  };
  return (
    <div>
      <h2>Task List</h2>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            <input
              type="checkbox"
              checked={task.isCompleted}
              onChange={() => handleToggleComplete(task.id, task.isCompleted)}
            />
            <span
              style={{
                textDecoration: task.isCompleted ? "line-through" : "none",
              }}
            >
              {task.title}
            </span>{" "}
            - <Link to={`/edit-task/${task.id}`}>Edit</Link> |{" "}
            <button onClick={() => handleDeleteTask(task.id)}>Delete</button>
          </li>
        ))}
      </ul>
      <Link to="/add-task">Add Task</Link>
      <button onClick={handleLogout}>logout</button>
    </div>
  );
};

export default TaskList;
