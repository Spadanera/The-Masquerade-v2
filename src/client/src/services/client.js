import { create } from 'axios';

const client = create({
  baseURL: 'http://localhost:3000/api'
});

export default client;