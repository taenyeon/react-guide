export const viewModelStatus = {
    loading: "loading",
    done: 'done',
    error: 'error',
} as const;

export type ViewModelStatus =
    typeof viewModelStatus[keyof typeof viewModelStatus];