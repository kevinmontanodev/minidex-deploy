import {create} from "zustand"

type AlertMode = "alert" | "confirm"

interface AlertState {
    show:boolean,
    title: string,
    message: string,
    mode: AlertMode,
    resolve?: (value: boolean) => void
}

export interface GlobalAlert {
    alert: (title: string, message: string) => void
    confirm: (title: string, message: string) => Promise<boolean>
    close: () => void
    state: AlertState
}

export const useAlertStore = create<GlobalAlert>((set) => ({
    state: {
        show: false,
        title: "",
        message: "",
        mode: "alert"
    },

    alert: (title, message) => 
        set({
            state: {
                show: true,
                title,
                message,
                mode: "alert"
            }
        }),

    confirm : (title, message) => {
        return new Promise<boolean>((resolve) => {
            set({
                state: {
                    show: true,
                    title,
                    message,
                    mode: "confirm",
                    resolve
                }
            })
        })
    },

    close: () => 
        set({
            state: {
                show: false,
                title: "",
                message: "",
                mode:"alert"
            }
        })
}))