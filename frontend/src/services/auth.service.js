import apiClient from './api.service';
import router from '@/router/index';

class AuthService {
  login(user) {
    return apiClient
      .post('auth/signIn', user)
      .then(res => {
        localStorage.setItem('accessToken', res.data.AuthenticationResult.AccessToken);
        localStorage.setItem('idToken', res.data.AuthenticationResult.IdToken);
        return res.data;
      });
  }

  logout() {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('idToken');
    router.push('/sign-in');
  }

  register(user) {
    return apiClient
      .post('auth/signUp', user)
      .then(res => {
        localStorage.setItem('accessToken', res.data.AuthenticationResult.AccessToken);
        localStorage.setItem('idToken', res.data.AuthenticationResult.IdToken);
        return res.data
      });
  }
}

export default new AuthService();