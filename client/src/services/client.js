import { create } from 'axios';
import router from '../router.js';

let client = create({
  //baseURL: `${process.env.PROTOCOL || "http" }://${process.env.ORIGIN || "localhost" }`
});

client.interceptors.request.use(config => {
  return config
});

client.interceptors.response.use(
  response => {
    return response; 
  },
  error => {
    if (error.response.status === 401) {
      router.push("/");
    }
    return Promise.reject(error);
  }
);

export default client;