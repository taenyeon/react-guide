import ApiError from "./ApiError.ts";

export const parseError: (error: unknown) => (ApiError | Error) = (error: unknown) => {

    if (error instanceof ApiError) return error as ApiError;

    if (error instanceof Error) return error as Error;

    return error as Error;
}

