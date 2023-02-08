import React from "react";
import { TextField } from "@mui/material";

const ProfileDetail = () => {
  return (
    <>
      <TextField
        fullWidth
        margin="normal"
        id="username"
        label="Username"
        variant="outlined"
        name="username"
        disabled
      />

      <TextField
        fullWidth
        margin="normal"
        id="email"
        label="E-mail"
        variant="outlined"
        name="e-mail"
        disabled
      />
    </>
  );
};

export default ProfileDetail;
