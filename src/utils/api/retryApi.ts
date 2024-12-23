import axios, {AxiosInstance} from "axios";

const retryApi: () => AxiosInstance =
    () => {
        const instance: AxiosInstance = axios.create({
            baseURL: '',
            timeout: 5000,
        })

        instance.interceptors.request.use(

        )

        instance.interceptors.response.use(

        )

        return instance;
    };

export default retryApi