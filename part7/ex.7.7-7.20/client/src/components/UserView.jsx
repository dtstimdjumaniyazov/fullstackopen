import { Link } from "react-router-dom"
import { useUsersViewStore } from "../store/store"
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'

const UserView = () => {
    const users = useUsersViewStore()
    const rows = (arr) => {
        return arr.map(u => {
            return (
                {
                    id: u.id,
                    name: u.name,
                    username: u.username,
                    blogsCreated: u.blogs.length
                }

            )
        })
    }
    
    
    return (
        <div style={{ marginLeft: "5px" }}>
            <h2>Users</h2>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                    <TableRow>
                        <TableCell style={{ fontWeight: 'bold' }}>Name</TableCell>
                        <TableCell style={{ fontWeight: 'bold' }}>Username</TableCell>
                        <TableCell style={{ fontWeight: 'bold' }}>Blogs created</TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {rows(users).map((row) => (
                        <TableRow
                        key={row.id}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                        <TableCell component="th" scope="row">
                            <Link to={`/users/${row.id}`}>
                                {row.name}
                            </Link>
                        </TableCell>
                        <TableCell>{row.username}</TableCell>
                        <TableCell>{row.blogsCreated}</TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
                </TableContainer>

        </div>
    )
}

export default UserView