import axios, {AxiosInstance} from 'axios'
import tokenRepository from "../../repositories/TokenRepository.ts";

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
                    `url : ${config.baseURL}/ ${config.url}\n` +
                    `method : ${config.method}\n\n` +
                    `headers : \n${JSON.stringify(config.headers, null, 2)}\n` +
                    `data  ${JSON.stringify(config.data, null, 2)}\n` +
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
                    `headers :\n${JSON.stringify(response.headers, null, 2)}\n` +
                    `body : ${JSON.stringify(response.data, null, 2)}\n\n`);

                return response
            },
            (error) => {
                // todo 401 accessToken 만료 시, retry 정책 필요.
                return Promise.reject(error)
            }
        );
        return instance;
    }

export default api