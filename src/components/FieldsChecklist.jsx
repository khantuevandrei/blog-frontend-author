import { List, ListItem, ListItemIcon, ListItemText } from "@mui/material";
import { CheckCircle, Cancel } from "@mui/icons-material";

export default function FieldsChecklist({ validations }) {
  const items = [
    // Username validations
    { label: "Username: 3-20 characters", key: "usernameLength" },
    { label: "Username: only letters, numbers, underscore", key: "validChars" },

    // Password validations
    { label: "Password: at least 8 characters", key: "passLength" },
    { label: "Password: lowercase letter", key: "lowercase" },
    { label: "Password: uppercase letter", key: "uppercase" },
    { label: "Password: number", key: "number" },
    { label: "Password: symbol", key: "symbol" },
    { label: "Passwords match", key: "passwordsMatch" },
  ];

  return (
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
  );
}
