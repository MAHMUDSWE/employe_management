import axios from "axios";

const axiosClient = axios.create({
  baseURL: "/",
});

export { axiosClient };
