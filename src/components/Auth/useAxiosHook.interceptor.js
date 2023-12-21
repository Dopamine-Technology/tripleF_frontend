import axios from "axios";
import { useContext } from "react";
import { UserDataContext } from "../UserContext/UserData.context";
import Cookies from "js-cookie";
const defaultOptions = {
  baseURL: "https://backendtriplef.dopaminetechnology.com/api/",
  headers: {
    "Content-Type": "application/json",
  },
};

const useAxios = () => {
  const { user, setUser } = useContext(UserDataContext);
  const token = user?.token || Cookies.get("token");
  const refresh = user?.refresh || Cookies.get("refresh");

  const axiosInstance = axios.create({
    ...defaultOptions,
    headers: {
      ...defaultOptions.headers,
      Authorization: `Bearer ${token}`,
    },
  });
  axiosInstance.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      const originalRequest = error.config;
      if (
        error.response &&
        error.response.status === 401 &&
        !originalRequest._retry
      ) {
        originalRequest._retry = true;
        return axiosInstance
          .post("auth/jwt/refresh/", {
            refresh,
          })
          .then((response) => {
            const newAccessToken = response.data.access;
            
            Cookies.set(
              "token",
              newAccessToken
            
            );
        
            setUser({
              ...user,
              token: newAccessToken,
            });
            originalRequest.headers[
              "Authorization"
            ] = `Bearer ${newAccessToken}`;
            return axiosInstance(originalRequest);
          })
          .catch(() => {
          
            Cookies.set("token", "", {
              domain: process.env.SITE_DOMAIN,
            });
          
          });
      }
      return Promise.reject(error);
    }
  );

  return axiosInstance;
};

export default useAxios
export const url =defaultOptions.baseURL