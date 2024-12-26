import {create} from "zustand/react";

export type SnackbarViewModel = {
    errors: Error[];

    add: (error: Error) => Promise<void>;
    drop: (index: number) => Promise<void>;
}

const snackbarViewModel = create<SnackbarViewModel>(
    (set) => ({
        errors: [],
        currentIndex: 0,
        add: async (error: Error) => {
            set((state) =>
                ({errors: [...state.errors, error]}))
        },
        drop: async (index: number) => {
            set(state =>
                ({errors: state.errors.filter((_, listIndex) => index != listIndex)}))
        }
    })
)

export default snackbarViewModel;