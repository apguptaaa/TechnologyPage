import axios from 'axios';

// Set your backend API base URL
const BaseUrl =  'http://localhost:5000/api';

const axiosInstance = axios.create({
  baseURL: BaseUrl,
});

// Create a new technology
export const createTechnology = (techData) => {
  return axiosInstance.post('/technoinsert', techData)
};
