import axios from "axios";
import Cookies from 'js-cookie';
import { renewToken } from "../services/userService";
import { useRouter } from "next/router";


const api = axios.create({
  baseURL: 'https://filelens-backend0-465575334917.us-central1.run.app/api/v1',
})

api.interceptors.request.use(
  async (config) => {
    const token = Cookies.get('Token');
    console.log(token)

    if (!config.headers['Authorization']) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor triggered if token expires
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const router = useRouter();
    const originalRequest = error.config;

    if (error.response?.status === 403 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const email = Cookies.get('UserEmail');
        if (!email) throw new Error("Email not found in cookies");

        const renewResult = await renewToken(email);

        if (renewResult.success === true) {
          const token = Cookies.get('Token');

          originalRequest.headers['Authorization'] = `Bearer ${token}`;

          return api(originalRequest);
        } else {
          console.error('Failed to renew token:', renewResult.error);
          router.push('/login');
          return Promise.reject(error);
        }
      } catch (err) {
        console.error('Error trying to renew the token', err);
        router.push('/login');
        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  }
);

export default api;