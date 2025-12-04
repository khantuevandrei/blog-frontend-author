import { List, ListItem, ListItemIcon, ListItemText } from "@mui/material";
import { CheckCircle, Cancel } from "@mui/icons-material";
import ProgressBar from "./ProgressBar";

export default function PasswordChecklist({ validations }) {
  const items = [
    { label: "Password: at least 8 characters", key: "length" },
    { label: "Password: lowercase letter", key: "lowercase" },
    { label: "Password: uppercase letter", key: "uppercase" },
    { label: "Password: number", key: "number" },
    { label: "Password: symbol", key: "symbol" },
    { label: "Passwords match", key: "passwordsMatch" },
  ];

  return (
    <>
      <ProgressBar validations={validations} />
      <List dense sx={{ mt: 1 }}>
        {items.map((item) => (
          <ListItem key={item.key}>
            <ListItemIcon>
              {validations[item.key] ? (
                <CheckCircle color="success" />
              ) : (
                <Cancel color="error" />
              )}
            </ListItemIcon>
            <ListItemText primary={item.label} />
          </ListItem>
        ))}
      </List>
    </>
  );
}
