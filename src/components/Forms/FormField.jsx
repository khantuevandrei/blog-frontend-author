import { TextField, useTheme } from "@mui/material";

export default function FormField({
  label,
  name,
  value,
  onChange,
  required = true,
}) {
  const theme = useTheme();

  return (
    <TextField
      label={label}
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
        },
      }}
      FormHelperTextProps={{
        style: { color: theme.palette.text.secondary },
      }}
    />
  );
}
