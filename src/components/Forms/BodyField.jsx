import { TextField } from "@mui/material";

export default function BodyField({ value, onChange }) {
  return (
    <TextField
      label="Body"
      name="body"
      margin="normal"
      value={value}
      onChange={onChange}
      fullWidth
      multiline
      rows={8}
      required
    />
  );
}
