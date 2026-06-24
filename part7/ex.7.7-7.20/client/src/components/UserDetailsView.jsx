import { useNavigate, useParams } from "react-router-dom"
import { Typography, Box } from "@mui/material"
import { useUsersViewStore } from "../store/store"

const UserDetailView = () => {
    const users = useUsersViewStore()
    const id = useParams().id
    const user = users.find((u) => u.id === id)
    const navigate = useNavigate()

    if (!users) {
        return <div>User not found</div>
    }

    return (
        <Box sx={{ border: "1px solid #ccc", borderRadius: 2, p: 3, mt: 2 }}>
            <Typography variant="h4">{user?.name}</Typography>
            <Typography variant="h5">added blogs</Typography>
            <ul>
                {user?.blogs.map(b => {
                    return (<li key={b.id}>{b.title}</li>)
                })}
            </ul>
        </Box>
    )
}

export default UserDetailView