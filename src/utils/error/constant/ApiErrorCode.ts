export const apiErrorCode = {

    // default
    NOT_FOUND_ERROR: "NOT_FOUND_ERROR",
    INVALID_REQUEST_PARAM:"INVALID_REQUEST_PARAM",
    UNKNOWN_ERROR: "UNKNOWN_ERROR",
    MANUAL_ERROR: "MANUAL_ERROR",

    // authorization
    AUTH_ERROR: "AUTH_ERROR",
    ACCESS_DENIED_ERROR: "ACCESS_DENIED_ERROR"

} as const;

export type ApiErrorCode = typeof apiErrorCode[keyof typeof apiErrorCode]

