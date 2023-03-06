import axios from "axios";
const VITE_SERVERURL = `${import.meta.env.VITE_SERVERURL}/api`;

export function VerifyJWT(jwtToken: string ) {
  if (jwtToken === null) {
    axios.get(`${VITE_SERVERURL}/login/verify`, {
      headers: {
        "x-auth-token": "random",
      },
    });
  }
  return axios.get(`${VITE_SERVERURL}/login/verify`, {
    headers: {
      "x-auth-token": jwtToken,
    },
  });
}

export function AdminLogin(formData: any) {
  return axios.post(`${VITE_SERVERURL}/login`, formData, {
    headers: {
      "Content-Type": "application/json",
    },
  });
}