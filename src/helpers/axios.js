import Axios from "axios";

const axios = Axios.create({
  baseURL: `http://${import.meta.env.VITE_SERVER_URL}:${
    import.meta.env.VITE_SERVER_PORT
  }`,
});

// If there is a token always set it when communicating with the api
axios.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  config.headers.Authorization = "Bearer " + token;
  return config;
});

export default axios;
