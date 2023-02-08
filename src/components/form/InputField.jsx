import React from "react";
import { Controller } from "react-hook-form";
import TextField from "@mui/material/TextField";

export const InputField = (props) => {

  const handleForm = (event) => {
    props.setOnEvent(event.target.value);
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
        />
      )}
    />
  );
};