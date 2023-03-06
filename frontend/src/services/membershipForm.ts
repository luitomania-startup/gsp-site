import axios from "axios";

import type { MembershipForm, MembershipSubmission } from "../types/types";
const VITE_SERVERURL = `${import.meta.env.VITE_SERVERURL}/api`;

export const getUploadMembershipFormSign = (preset:string) => {
  return axios.get(`${VITE_SERVERURL}/cloudinary/${preset}`);
}

export const getMembershipForm = () => {
  return axios.get(`${VITE_SERVERURL}/membershipForm`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const getMembershipSubmissions = () => {
  return axios.get(`${VITE_SERVERURL}/membershipForm/submissions`, {
    headers: {
      "Content-Type": "application/json",
      "x-auth-token": sessionStorage.getItem("jwtToken")
    },
  });
};



export const editMembershipForm = (data: MembershipForm | {}) => {
  return axios.patch(`${VITE_SERVERURL}/membershipForm/editForm`, data, {
    headers: {
      "Content-Type": "application/json",
      "x-auth-token": sessionStorage.getItem("jwtToken"),
    },
  });
};

export const submitMembershipForm = (data: MembershipSubmission | {}) => {
  return axios.post(`${VITE_SERVERURL}/membershipForm/submitForm`, data, {
    headers: {
      "Content-Type": "application/json"
    },
  });
};