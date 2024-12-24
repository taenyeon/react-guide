import {ApiErrorCode} from "./constant/ApiErrorCode.ts";

class ApiError extends Error {

    public code: ApiErrorCode;
    public originalError?: Error

    constructor(code: ApiErrorCode, originalError?: Error) {
        super(code);
        this.name = `${this.constructor.name}.${code}`;
        this.code = code;
        this.originalError = originalError
    }

    toString() {
        return `code: ${this.code}\noriginalError: ${this.originalError?.name}\n${this.originalError?.message}`
    }
}

export default ApiError