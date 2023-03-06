import axios from "axios";

import type { AboutUs } from "../types/types";
const VITE_SERVERURL = `${import.meta.env.VITE_SERVERURL}/api`;

export const getUploadAboutUsSign = (preset:string) => {
  return axios.get(`${VITE_SERVERURL}/cloudinary/${preset}`);
}

export const getAboutUs = () => {
  return axios.get(`${VITE_SERVERURL}/aboutUs`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};



export const editAboutUs = (data: AboutUs | {}) => {
  return axios.patch(`${VITE_SERVERURL}/aboutUs`, data, {
    headers: {
      "Content-Type": "application/json",
      "x-auth-token": sessionStorage.getItem("jwtToken"),
    },
  });
};