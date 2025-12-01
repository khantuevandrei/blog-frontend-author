import { List, ListItem, ListItemIcon, ListItemText } from "@mui/material";
import { CheckCircle, Cancel } from "@mui/icons-material";

export default function PasswordChecklist({ validations }) {
  const items = [
    { label: "At least 8 characters", key: "length" },
    { label: "Lowercase letter", key: "lowercase" },
    { label: "Uppercase letter", key: "uppercase" },
    { label: "Number", key: "number" },
    { label: "Symbol", key: "symbol" },
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
