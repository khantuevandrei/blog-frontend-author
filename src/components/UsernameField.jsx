import { TextField } from "@mui/material";

export default function UsernameField({ value, onChange }) {
  return (
    <TextField
      label="Username"
      name="username"
      fullWidth
      margin="normal"
      value={value}
      onChange={onChange}
      required
    />
  );
}
