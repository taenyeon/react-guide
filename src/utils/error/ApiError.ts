import {ApiCode} from "./constant/ApiCode.ts";

class ApiError extends Error {

    public apiCode: ApiCode;
    public originalError?: Error

    constructor(code: ApiCode, originalError?: Error) {
        super(code);
        this.name = `${this.constructor.name}.${code}`;
        this.apiCode = code;
        this.originalError = originalError
    }

    toString() {
        return `code: ${this.apiCode}\noriginalError: ${this.originalError?.name}\n${this.originalError?.message}`
    }
}

export default ApiError