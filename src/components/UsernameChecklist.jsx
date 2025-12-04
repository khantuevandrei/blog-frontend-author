import { List, ListItem, ListItemIcon, ListItemText } from "@mui/material";
import { CheckCircle, Cancel } from "@mui/icons-material";
import ProgressBar from "./ProgressBar";

export default function UsernameChecklist({ validations }) {
  const items = [
    { label: "Username: 3-20 characters", key: "length" },
    { label: "Username: only letters, numbers, underscore", key: "validChars" },
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
