import axios from "axios";

const apiBaseUrl =
  import.meta.env.VITE_API_URL || "https://github-analyzer2.onrender.com";

const API = axios.create({
  baseURL: `${apiBaseUrl}/api`,
});

export default API;
