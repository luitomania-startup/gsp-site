import axios from "axios";
import { IFeed, IMember } from "../types/types";

const VITE_SERVERURL = `${import.meta.env.VITE_SERVERURL}/api`;

const baseUrl = `${VITE_SERVERURL}/feeds`;

export const getFeeds = () => {
  return axios.get(`${baseUrl}/`);
};

export const postFeed = (data: any) => {
  return axios.post(`${baseUrl}/`, data, {
    headers: {
      "Content-Type": "application/json",
      "x-auth-token": sessionStorage.getItem("jwtToken"),
    },
  });
};
// interface IObj extends IData{
//     [key:string] : string;
// }
interface IData {
  id: string;
}
export const editFeed = (data: IFeed) => {
  return axios.patch(`${baseUrl}/`, data, {
    headers: {
      "Content-Type": "application/json",
      "x-auth-token": sessionStorage.getItem("jwtToken"),
    },
  });
};

export const deleteFeed = (data: IData) => {
  return axios.post(`${baseUrl}/delete`, data, {
    headers: {
      "Content-Type": "application/json",
      "x-auth-token": sessionStorage.getItem("jwtToken"),
    },
  });
};

export const getFeedUploadSign = () => {
  return axios.get(`${VITE_SERVERURL}/cloudinary/feeds`);
};

export const getFeed = async (id: string) => {
  const data = await axios.post(`${baseUrl}/getFeed`, {
    id: parseInt(id),
  });

  return data;
};
