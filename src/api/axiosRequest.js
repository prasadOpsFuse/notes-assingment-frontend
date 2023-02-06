import axios from 'axios';

const Axios = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

const axiosRequest = async (method, url, data={}, headers = {}) => {
  try {
    const response = await Axios[method](url, { ...data});
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export default axiosRequest;
