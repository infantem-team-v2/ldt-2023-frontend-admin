import axios from 'axios';

const api = axios.create({
  baseURL: 'https://admin.gb.ldt2023.infantem.tech',
  withCredentials: true,
});

export default api;