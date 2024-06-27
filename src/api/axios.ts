import axios, { CreateAxiosDefaults } from "axios";

const options: CreateAxiosDefaults = {
  baseURL: 'https://jsonplaceholder.typicode.com/',
  headers: {
    'Content-Type': 'application/json; charset=UTF-8'
  },
  withCredentials: true
}

const myAxios = axios.create(options)

export { myAxios }