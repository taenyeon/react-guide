export const viewModelStatus = {
    loading: "loading",
    done: 'done',
    error: 'error',
} as const;

export const isError = (status: ViewModelStatus) => status == viewModelStatus.error

export const isLoading = (status: ViewModelStatus) => status == viewModelStatus.loading

export type ViewModelStatus =
    typeof viewModelStatus[keyof typeof viewModelStatus];