import { Alert } from '@mui/material'

const Notification = ({ message, severity }) => {
  if (message === null) {
    return null
  }

  return (
    <Alert severity={severity} style={{ marginTop: 10, marginBottom: 10 }}>
      {message}
    </Alert>
  )
}

export default Notification