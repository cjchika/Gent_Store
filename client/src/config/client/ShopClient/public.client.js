import axios from "axios";
import queryString from "query-string";
import { apiUrl } from "../../api";

const publicClient = axios.create({
  baseURL: apiUrl,
  paramsSerializer: {
    encode: (params) => queryString.stringify(params),
  },
});

publicClient.interceptors.request.use(async (config) => {
  return {
    ...config,
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true,
  };
});

publicClient.interceptors.response.use(
  (response) => {
    if (response && response.data) return response.data;
  },
  (err) => {
    throw err.response.data;
  }
);

export default publicClient;
