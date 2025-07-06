import axios from 'axios';

// Set your backend API base URL
const BaseUrl =  'https://technoserverapi.onrender.com/api';

const axiosInstance = axios.create({
  baseURL: BaseUrl,
});

// Create a new technology
export const createTechnology = (techData) => {
  return axiosInstance.post('/technoinsert', techData)
};

// Get all technologies
export const getAllTechnologies = () => {
  return axiosInstance.get('/technodisplay');
}

// Get a single technology by ID
export const getTechnologyById = (id) => {
  return axiosInstance.get(`/technoview/${id}`);
};

// Update a technology by ID
export const updateTechnology = (id, updatedData) => {
  return axiosInstance.put(`/technoupdate/${id}`, updatedData);
};

// Delete a technology by ID
export const deleteTechnology = (id) => {
  return axiosInstance.delete(`/technodelete/${id}`);
};
