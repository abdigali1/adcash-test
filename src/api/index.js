import axios from "axios";

const headers = {
  "Content-Type": "application/json",
};

const url = "https://private-anon-a7ba34b44d-adcashdsp.apiary-mock.com";

export const api = axios.create({
  baseURL: url,
  headers,
});
