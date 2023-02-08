import React from "react";
import { TextField } from "@mui/material";

const SecurityDetail = () => {
  return (
    <>
      <TextField
        fullWidth
        margin="normal"
        id="password"
        label="Password"
        variant="outlined"
        name="password"
        type="password"
        value=""
        autoComplete="off"
        disabled
      />

      <TextField
        fullWidth
        margin="normal"
        id="new-password"
        label="New password"
        variant="outlined"
        name="new-password"
        type="password"
        value=""
        autoComplete="off"
        disabled
      />

      <TextField
        fullWidth
        margin="normal"
        id="repeat-new-password"
        label="Repeat new password"
        variant="outlined"
        name="repeat-new-password"
        type="password"
        value=""
        autoComplete="off"
        disabled
      />
    </>
  );
};

export default SecurityDetail;
