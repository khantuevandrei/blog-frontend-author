import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  useTheme,
} from "@mui/material";
import { CheckCircle, Cancel } from "@mui/icons-material";
import ProgressBar from "./ProgressBar";

export default function UsernameChecklist({ validations }) {
  const theme = useTheme();

  const items = [
    { label: "3-20 characters", key: "length" },
    { label: "Only letters, numbers, underscore", key: "validChars" },
  ];

  return (
    <>
      <ProgressBar validations={validations} />
      <List dense sx={{ mt: 1 }}>
        {items.map((item) => (
          <ListItem key={item.key}>
            <ListItemIcon>
              {validations[item.key] ? (
                <CheckCircle
                  sx={(theme) => ({
                    color:
                      theme.palette.mode === "dark"
                        ? theme.palette.success.light
                        : theme.palette.success.dark,
                  })}
                />
              ) : (
                <Cancel
                  sx={{
                    color:
                      theme.palette.mode === "dark"
                        ? theme.palette.error.light
                        : theme.palette.error.dark,
                  }}
                />
              )}
            </ListItemIcon>
            <ListItemText primary={item.label} />
          </ListItem>
        ))}
      </List>
    </>
  );
}
