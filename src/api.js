import axios from "axios";
// import { store } from "./store";

let api = axios.create({
  baseURL: "https://localhost:5001",
});

// Add a response interceptor
api.interceptors.response.use(
  function(response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    console.log("This is some axios interceptor 1");
    return response;
  },
  function(error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    console.log("This is some axios interceptor 2 for error");
    return Promise.reject(error);
  }
);

export default api;
