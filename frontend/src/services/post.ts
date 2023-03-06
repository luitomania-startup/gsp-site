import axios from "axios";

import type { Post } from "../types/types";
const VITE_SERVERURL = `${import.meta.env.VITE_SERVERURL}/api`;

export const getUploadPostSign = (preset:string) => {
  return axios.get(`${VITE_SERVERURL}/cloudinary/${preset}`);
}

export const getPosts = ({page=1, limit = 4}) => {
  return axios.get(`${VITE_SERVERURL}/posts`, {
    headers: {
      "Content-Type": "application/json",
    },
    params: {
      limit: limit,
      page: page,
    },
  });
};

export const getPost = (id: string) => {
  return axios.get(`${VITE_SERVERURL}/posts/${id}`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const postPost = (data: Post | {}, {page=1, limit = 4}) => {
  return axios.post(`${VITE_SERVERURL}/posts`, data, {
    headers: {
      "Content-Type": "application/json",
      "x-auth-token": sessionStorage.getItem("jwtToken"),
    },
    params: {
      limit: limit,
      page: page,
    },
  });
};



export const editPost = (data: Post | {}, {page=1, limit = 4}) => {
  return axios.patch(`${VITE_SERVERURL}/posts`, data, {
    headers: {
      "Content-Type": "application/json",
      "x-auth-token": sessionStorage.getItem("jwtToken"),
    },
    params: {
      limit: limit,
      page: page,
    },
  });
};



export const deletePost = (data: {_id: string}, {page=1, limit = 4}) => {
  return axios.post(`${VITE_SERVERURL}/posts/delete`, data, {
    headers: {
      "Content-Type": "application/json",
      "x-auth-token": sessionStorage.getItem("jwtToken"),
    },
    params: {
      limit: limit,
      page: page,
    },
  });
};


  