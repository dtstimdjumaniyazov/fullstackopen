import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import blogService from '../services/blogs'
import loginService from '../services/login'
import usersService from '../services/users'
import { getUser, removeUser, saveUser } from '../services/persistentUser'


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

export const useBlogStore = create((set, get) => ({
    blogs: [],
    users: [],
    actions: {
        initialize: async () => {
            const blogs = await blogService.getAll()
            set(() => ({ blogs }))
        },
        initializeUsers: async () => {
            const users = await usersService.getUsers()
            set(() => ({ users }))
        },
        addBlog: async (blog) => {
            const newBlog = await blogService.create(blog)
            set(state => ({blogs: state.blogs.concat(newBlog)}))
        },
        addLike: async (id) => {
            const blog = get().blogs.find(b => b.id === id)
            const updated = await blogService.update(
                id, { ...blog, likes: (blog.likes + 1), user: blog.user.id }
            )
            set(state => ({
                blogs: state.blogs.map(b => b.id === id ? updated : b)
            }))
        },
        removeBlog: async (id) => {
            const blog = get().blogs.find(b => b.id === id)
            await blogService.remove(id, {...blog})
            set(state => ({
                blogs: state.blogs.filter(b => b.id !== id)
            }))
        },
        addComment: async (id, comment) => {
            const blog = get().blogs.find(b => b.id === id)
            const addedCommentBlog = await blogService.addComment(blog.id, comment)
            set(state => ({
                blogs: state.blogs.map(b => b.id === id ? addedCommentBlog : b)
            }))
        }
    }
}))

export const useUserStore = create((set, get) => ({
    user: {},
    actions: {
        login: async (username, password) => {
            const user = await loginService.login({ username, password })
            saveUser(user)
            blogService.setToken(user.token)
            set(() => ({ user }))
        },
        initializeUser: () => {
            const user = getUser()
            if (user) {
                blogService.setToken(user.token)
                set(() => ({ user }))
            }
        },
        logout: () => {
            removeUser()
            set(() => ({ user: null }))
        }
    }
}))

export const useNotificationMessage = () => useNotificationStore((state) => state.message)
export const useNotificationType = () => useNotificationStore((state) => state.type)
export const useNotificationActions = () => useNotificationStore((state) => state.actions)
export const useBlogActions = () => useBlogStore((state) => state.actions)
export const useBlogsStore = () => useBlogStore((state) => state.blogs)
export const useUsersViewStore = () => useBlogStore((state) => state.users)
export const useUsersStore = () => useUserStore((state) => state.user)
export const useUserActions = () => useUserStore((state) => state.actions)