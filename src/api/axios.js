import axios from "axios";

axios.defaults.baseURL = "http://localhost:8000/";
axios.defaults.withCredentials = true;
axios.defaults.headers.common["Accept"] = "application/json;charset=UTF-8";
axios.defaults.headers.common["Content-Type"] =
  "application/json;charset=UTF-8";

axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axios;
