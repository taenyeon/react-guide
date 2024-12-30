export const apiCode = {

    SUCCESS: "SUCCESS",
    // default
    NOT_FOUND_ERROR: "NOT_FOUND_ERROR",
    INVALID_REQUEST_PARAM: "INVALID_REQUEST_PARAM",
    UNKNOWN_ERROR: "UNKNOWN_ERROR",
    MANUAL_ERROR: "MANUAL_ERROR",

    // authorization
    AUTH_ERROR: "AUTH_ERROR",
    ACCESS_DENIED_ERROR: "ACCESS_DENIED_ERROR",
    LOGIN_FAILURE: "LOGIN_FAILURE"

} as const;

export type ApiCode = typeof apiCode[keyof typeof apiCode];

