import axios from 'axios';

const apiClient = axios.create({
  baseURL: `http://localhost:8000/api/`,
});

apiClient.defaults.headers.common = {
  Authorization: 'Bearer ' + localStorage.getItem('accessToken'),
  idToken: localStorage.getItem('idToken'),
  Accept: 'application/json',
}

export default apiClient;