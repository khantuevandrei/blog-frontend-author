import { useState } from "react";
import { TextField, IconButton, InputAdornment, useTheme } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

export default function PasswordField({
  label,
  name,
  value,
  onChange,
  required = true,
}) {
  const [show, setShow] = useState(false);
  const toggle = () => setShow((prev) => !prev);
  const theme = useTheme();

  return (
    <TextField
      label={label}
      type={show ? "text" : "password"}
      name={name}
      fullWidth
      margin="normal"
      value={value}
      onChange={onChange}
      required={required}
      variant="outlined"
      InputLabelProps={{
        style: { color: theme.palette.text.secondary },
      }}
      InputProps={{
        style: {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.background.paper,
        },
        endAdornment: (
          <InputAdornment position="end">
            <IconButton onClick={toggle} edge="end">
              {show ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        ),
      }}
      FormHelperTextProps={{
        style: { color: theme.palette.text.secondary },
      }}
    />
  );
}
