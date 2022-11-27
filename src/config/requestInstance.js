import axios from "axios";
import {storageService} from "../services/StorageService";
import {storageKeys} from "./config";

export const requestInstance = axios.create();

requestInstance.defaults.baseURL = 'http://127.0.0.1:8000/api' //backend app url;
requestInstance.defaults.headers['Accept'] = "application/json";

requestInstance.interceptors.request.use(
    async (config) => {
        config.headers.Authorization = storageService.exists(storageKeys.USER) ?
            `Bearer ${storageService.get(storageKeys.USER)}`
            : 'undefined';
        return config;
    },
    (error) => {
        Promise.reject(error)
    }
)