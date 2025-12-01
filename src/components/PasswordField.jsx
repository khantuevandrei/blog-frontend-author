import { useState } from "react";
import { TextField, IconButton, InputAdornment } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

export default function PasswordField({ label, name, value, onChange }) {
  const [show, setShow] = useState(false);
  const toggle = () => setShow((prev) => !prev);

  return (
    <TextField
      label={label}
      type={show ? "text" : "password"}
      name={name}
      fullWidth
      margin="normal"
      value={value}
      onChange={onChange}
      required
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton onClick={toggle} edge="end">
              {show ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
}
