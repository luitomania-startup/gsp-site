import axios from "axios";
import { IMember } from "../types/types";

const VITE_SERVERURL = `${import.meta.env.VITE_SERVERURL}/api`;
const baseUrl = `${VITE_SERVERURL}/members`;

export const getMembers = () => {
  return axios.get(`${baseUrl}/`);
};

export const postMembers = (data: IMember) => {
  // console.log("inside post" + data);
  return axios.post(`${baseUrl}/`, data, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};
interface IObj extends IData {
  [key: string]: string;
}
interface IData {
  id: string;
}
export const editMembers = (data: IMember) => {
  return axios.patch(`${baseUrl}/`, data, {
    headers: {
      "Content-Type": "application/json",
      "x-auth-token": sessionStorage.getItem("jwtToken"),
    },
  });
};

export const deleteMembers = (data: IData) => {
  return axios.post(`${baseUrl}/delete`, data, {
    headers: {
      "Content-Type": "application/json",
      "x-auth-token": sessionStorage.getItem("jwtToken"),
    },
  });
};
export const getUploadSign = (preset: string) => {
  return axios.get(`${VITE_SERVERURL}/cloudinary/${preset}`);
};

export const getMember = async (id: string) => {
  const data = await axios.post(`${baseUrl}/getMember`, {
    id: parseInt(id),
  });

  return data;
};
