import { useState } from "react";
import { Controller } from "react-hook-form";
import { TextField, InputAdornment, IconButton } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

export const PasswordField = (props) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleForm = (event) => {
    props.setOnEvent(event.target.value);
  };

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Controller
      name={props.name}
      control={props.control}
      render={({ field: { ...field }, fieldState: { error } }) => (
        <TextField
          {...field}
          required
          fullWidth
          margin="normal"
          variant="outlined"
          autoComplete={props.autoComplete}
          value={props.value}
          label={props.label}
          onChange={handleForm}
          error={!!error}
          helperText={error?.message}
          type={showPassword ? "text" : "password"}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  // aria-label="Toggle password visibility"
                  disableRipple
                  onClick={handleShowPassword}
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      )}
    />
  );
};
