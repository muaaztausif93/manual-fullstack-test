import axios from 'axios';
import store from '@/store/index';


const apiClient = axios.create({
  baseURL: `http://localhost:8000/api/`,
});

apiClient.defaults.headers.common = {
  Authorization: 'Bearer ' + store.state.auth.user,
  idToken: localStorage.getItem('idToken'),
  Accept: 'application/json',
}

export default apiClient;