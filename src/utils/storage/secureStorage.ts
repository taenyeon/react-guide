import secureLocalStorage from "react-secure-storage";

const secureStorage = {
    get: (key: string) => secureLocalStorage.getItem(key),

    set: (key: string, value: string | number | object | boolean | null) => {
        if (value != null) secureLocalStorage.setItem(key, value)
    },

    drop: (key: string) => secureLocalStorage.removeItem(key)
}

export default secureStorage;