import axios, {AxiosInstance} from 'axios'
import tokenRepository from "../../repositories/TokenRepository.ts";
import ApiError from "../error/ApiError.ts";
import {apiErrorCode} from "../error/constant/ApiErrorCode.ts";

export const api: () => AxiosInstance =
    () => {
        const {getAccessToken} = tokenRepository;
        const instance: AxiosInstance = axios.create({
            baseURL: '',
            timeout: 5000,
        })

        instance.interceptors.request.use(
            (config) => {
                const accessToken = getAccessToken();
                if (accessToken != null) config.headers["authorization"] = accessToken;
                console.log(
                    `\n[\x1B[34mREQUEST\x1B[0m]\n\n` +
                    `url : ${config.baseURL}/${config.url}\n` +
                    `method : ${config.method}\n\n` +
                    `headers : ${JSON.stringify(config.headers, null, 2)}\n` +
                    `body : ${JSON.stringify(config.data, null, 2)}\n` +
                    `queryParams : ${config.params}\n\n`
                );

                return config;
            },

            (error) => {
                return Promise.reject(error)
            },
        );

        instance.interceptors.response.use(
            (response) => {

                console.log(
                    `\n[\x1B[31mRESPONSE\x1B[0m]\n\n` +
                    `url : ${response.config.baseURL}/${response.config.url}\n` +
                    `method : ${response.config.method}\n\n` +
                    `headers :${JSON.stringify(response.headers, null, 2)}\n` +
                    `body : ${JSON.stringify(response.data, null, 2)}\n\n`);

                return response
            },
            (error) => {
                if (!axios.isAxiosError(error)) return Promise.reject(error)

                switch (error.response?.status) {
                    case 401 :
                        return Promise.reject(new ApiError(apiErrorCode.AUTH_ERROR, error))
                    default :
                        return Promise.reject(new ApiError(apiErrorCode.UNKNOWN_ERROR, error))
                }
            }
        );
        return instance;
    }

export default api