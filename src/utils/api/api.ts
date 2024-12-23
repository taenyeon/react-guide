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
                if (accessToken != null) config.headers["authorization"] = getAccessToken;

                console.log(`\n[\x1B[34mREQUEST\x1B[0m]\n\n
                method : ${config.method}\n
                url : ${config.url}\n\n
                headers : \n${config.headers}\n
                data  ${config.data}\n
                queryParams : ${config.params}\n\n`);

                return config;
            },

            (error) => {
                return Promise.reject(error)
            },
        );

        instance.interceptors.response.use(
            (response) => {

                console.log(`\n[\x1B[31mRESPONSE\x1B[0m]\n\n
                url : ${response.request.url}\n\n
                headers :\n${response.headers}\n
                body : ${response.data}\n\n`);

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