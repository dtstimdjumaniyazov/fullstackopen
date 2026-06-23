import { Alert } from "@mui/material";
import { useNotificationMessage, useNotificationType } from "../store/store";

const Notification = () => {
  const message = useNotificationMessage()
  const type = useNotificationType()

  if (message === null) {
    return null;
  }

  return (
    <Alert severity={type} style={{ marginTop: 10, marginBottom: 10 }}>
      {message}
    </Alert>
  );
};

export default Notification;
