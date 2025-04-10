import axios from "axios";
const instance = axios.create({
  baseURL: "http://192.168.2.237:5137/api",
});

export default instance;
