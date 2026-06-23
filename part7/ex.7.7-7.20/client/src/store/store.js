import { create } from 'zustand'
import { devtools } from 'zustand/middleware'


const logger = (config) => (set, get) => config(
  (...args) => {
    console.log('prev state', get());
    set(...args);
    console.log('next state', get());
  },
  get
)

export const useNotificationStore = create(devtools((set, get) => ({
    message: null,
    type: null,
    actions: {
        createNotification: (title, duration = 5000) => {
            set({ message: `a new blog ${title} by ${JSON.parse(localStorage.getItem("loggedBlogappUser")).username} added`, type: 'success' })

            setTimeout(() => {
                set({ message: null, type: null })
            }, duration)
        },
        errorNotification: (errorMessage, duration = 5000) => {
            set({ message:  `Error: ${errorMessage}`, type: 'error' })

            setTimeout(() => {
                set({ message: null, type: null })
            }, duration)
        }
    }
})))

export const useNotificationMessage = () => useNotificationStore((state) => state.message)
export const useNotificationType = () => useNotificationStore((state) => state.type)
export const useNotificationActions = () => useNotificationStore((state) => state.actions)