import axios from "axios";
import { useRef } from "react";

const axiosSecure = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

const useAxiosSecure = () => {
  const interceptorSet = useRef(false);

  if (!interceptorSet.current) {
    axiosSecure.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem("access-token");
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );
    interceptorSet.current = true;
  }

  return axiosSecure;
};

export default useAxiosSecure;
