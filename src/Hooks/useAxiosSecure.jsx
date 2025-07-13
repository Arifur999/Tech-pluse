import axios from "axios";
import { useContext, useEffect, useRef } from "react";
import { getIdToken } from "firebase/auth";
import { AuthContext } from "../Context/AuthContext";

const axiosSecure = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

const useAxiosSecure = () => {
  const { user } = useContext(AuthContext);
  const interceptorSet = useRef(false); 

  useEffect(() => {
    if (user && !interceptorSet.current) {
      const setInterceptor = async () => {
        const token = await getIdToken(user);
        axiosSecure.interceptors.request.use(
          (config) => {
            config.headers.Authorization = `Bearer ${token}`;
            return config;
          },
          (error) => Promise.reject(error)
        );
        interceptorSet.current = true;
      };

      setInterceptor();
    }
  }, [user]);

  return axiosSecure;
};

export default useAxiosSecure;
