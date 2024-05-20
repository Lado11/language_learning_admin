import axios from "axios";
import { Navigate, useNavigate } from 'react-router-dom';
import { LogOut } from "../helper/logout";


let store;
export const injectStore = (_store) => {
  store = _store;
};

export const api = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
});

api.interceptors.request.use(async (config) => {
  console.log(config,"config")
  //   const Lang = localStorage.getItem("i18n")?.toLowerCase();
  const Token = localStorage.getItem("token");

  if (Token) {
    config.headers.Authorization = `Bearer ${Token}`;
  }

  if (
    Token &&
    (!config.headers.non_auth || config.headers.non_auth === "false")
  ) {
    config.headers.Authorization = `Bearer ${Token}`;
    // config.headers['Accept-Language'] = Lang
  }

  delete config.headers.non_auth;
  return config;
});




api.interceptors.response.use((response) => {
  return response
}, error => {
  if(error.response.status === 401){
    localStorage.clear();
    window.location = '/';
    return <redirect to="/login"/>;
  }
})

