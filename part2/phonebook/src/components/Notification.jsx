const Notification = ({ message, errorMsg }) => {
    if (message) {
        return <div className="success">{message}</div>
    }

    if (errorMsg) {
        return <div className="error">{errorMsg}</div>
    }

    return null
}

export default Notification