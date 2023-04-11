import axios from "axios";
import queryString from "query-string";
import { apiUrl } from "../../api";

const privateClient = axios.create({
  baseURL: apiUrl,
  paramsSerializer: {
    encode: (params) => queryString.stringify(params),
  },
});

privateClient.interceptors.request.use(async (config) => {
  return {
    ...config,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("tok")}`,
    },
    withCredentials: true,
  };
});

privateClient.interceptors.response.use(
  (response) => {
    if (response && response.data) return response.data;
  },
  (err) => {
    throw err.response.data;
  }
);

export default privateClient;
