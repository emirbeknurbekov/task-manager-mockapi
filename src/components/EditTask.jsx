// src/components/EditTask.jsx
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../api";

const EditTask = () => {
  const { taskId } = useParams();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    console.log("Task ID from useParams:", taskId);
    const fetchTask = async () => {
      try {
        if (taskId) {
          const response = await api.get(`/tasks/${taskId}`);
          console.log("Fetched task:", response.data);
          setTitle(response.data.title);
          setDescription(response.data.description);
        }
      } catch (error) {
        console.error("Error fetching task:", error.message);
      }
    };

    fetchTask();
  }, [taskId]);

  const handleEditTask = async () => {
    try {
      if (taskId) {
        console.log("Editing task with ID:", taskId);
        await api.put(`/tasks/${taskId}`, { title, description });
        navigate("/");
      }
    } catch (error) {
      console.error("Error editing task:", error.message);
    }
  };

  if (!taskId) {
    return <div>No task ID provided</div>;
  }

  return (
    <div>
      <h2>Edit Task</h2>
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
      <button onClick={handleEditTask}>Save Changes</button>
    </div>
  );
};

export default EditTask;
