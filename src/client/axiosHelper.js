import axios from "axios";

const client = axios.create({
  baseURL: "https://vctrade.pandats-api.io/api/v3/",
});

export default client;
