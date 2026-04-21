import { createContext, useState } from "react"

const NotificationContext = createContext()

export default NotificationContext

export const NotificationContextProvider = (props) => {
    const [message, setMessage] = useState('')

    const newMessage = (text, duration = 5000) => {
        setMessage(text)
        setTimeout(() => {
            setMessage(null)
        }, duration)
    }

    return (
        <NotificationContext.Provider value={{ message, newMessage }}>
            {props.children}
        </NotificationContext.Provider>
    )
}