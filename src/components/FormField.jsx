import { TextField } from "@mui/material";

export default function FormField({
  label,
  name,
  value,
  onChange,
  required = true,
}) {
  return (
    <TextField
      label={label}
      name={name}
      fullWidth
      margin="normal"
      value={value}
      onChange={onChange}
      required={required}
    />
  );
}
