export const getUser = () => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser")
    if (loggedUserJSON) {
        return JSON.parse(loggedUserJSON)
    }
    return null
}
export const saveUser = (user) => {
    return window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user))
}

export const removeUser = () => {
    return window.localStorage.removeItem("loggedBlogappUser")
}