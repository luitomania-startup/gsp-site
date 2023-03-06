import axios from "axios";

import type { Image, Video } from "../types/types";
const VITE_SERVERURL = `${import.meta.env.VITE_SERVERURL}/api`;

export const getUploadGallerySign = (preset:string) => {
  return axios.get(`${VITE_SERVERURL}/cloudinary/${preset}`);
}

export const getImages = ({page, limit}: {page: number, limit: number}) => {
  return axios.get(`${VITE_SERVERURL}/gallery/image`, {
    headers: {
      "Content-Type": "application/json",
    },
    params: {
      limit: limit,
      page: page,
    },
  });
};

export const getImage = (id: string) => {
  return axios.get(`${VITE_SERVERURL}/gallery/image/${id}`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const getVideos = ({page=1, limit = 4}) => {
  return axios.get(`${VITE_SERVERURL}/gallery/video`, {
    headers: {
      "Content-Type": "application/json",
      
    },
    params: {
      limit: limit,
      page: page,
    },
  });
};

export const getVideo = (id: string) => {
  return axios.get(`${VITE_SERVERURL}/gallery/video/${id}`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const postImage = (data: Image | {}, {page=1, limit = 4}) => {
  return axios.post(`${VITE_SERVERURL}/gallery/image`, data, {
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

export const postVideo = (data: Video | {}, {page=1, limit = 4}) => {
    return axios.post(`${VITE_SERVERURL}/gallery/video`, data, {
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
// interface IObj extends IData{
//     [key:string] : string;
// }

export const editImage = (data: Image | {}, {page=1, limit = 4}) => {
  return axios.patch(`${VITE_SERVERURL}/gallery/image`, data, {
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

export const editVideo = (data: Video | {}, {page=1, limit = 4}) => {
    return axios.patch(`${VITE_SERVERURL}/gallery/video`, data, {
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

export const deleteImage = (data: {_id: string}, {page=1, limit = 4}) => {
  return axios.post(`${VITE_SERVERURL}/gallery/image/delete`, data, {
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


export const deleteVideo = (data: {_id: string}, {page=1, limit = 4}) => {
    return axios.post(`${VITE_SERVERURL}/gallery/video/delete`, data, {
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
  