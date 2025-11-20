// service.js
import axios from 'axios';


axios.defaults.baseURL = "http://localhost:5293"; 
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

export const setCompleted = async (id, isComplete) => {
  const response = await axios.put(`/items/${id}`, { isComplete });
  return response.data;
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
