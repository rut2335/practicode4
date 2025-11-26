// service.js
import axios from 'axios';

axios.defaults.baseURL = process.env.REACT_APP_API_URL;
axios.defaults.headers.post["Content-Type"] = "application/json";

axios.interceptors.response.use(
  response => response, 
  error => {
    console.error("Axios error:", error); 
    return Promise.reject(error);
  }
);

export const getTasks = async () => {
  const response = await axios.get("/items"); 
  return response.data;
};

export const addTask = async (name) => {
  const response = await axios.post("/items", { name, isComplete: false });
  return response.data;
};

export const setCompleted = async (todo, isComplete) => {
  return await axios.put(`/items/${todo.id}`, {
    id: todo.id,
    name: todo.name,
    isComplete: isComplete
  });
};

export const deleteTask = async (id) => {
  const response = await axios.delete(`/items/${id}`);
  return response.data;
};

export default {
  getTasks,
  addTask,
  setCompleted,
  deleteTask
};
