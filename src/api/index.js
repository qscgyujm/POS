import axios from 'axios';

const apiRoot = axios.create({
  baseURL: 'http://localhost:1337/api',
});

// export default apiRoot;

export const getTestApi = () => apiRoot.get('/test');
