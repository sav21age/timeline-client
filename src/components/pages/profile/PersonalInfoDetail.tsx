import React from "react";
import { TextField } from "@mui/material";

const PersonalInfoDetail = () => {
  return (
    <>
      <TextField
        fullWidth
        margin="normal"
        id="country"
        label="Country"
        variant="outlined"
        name="country"
        value="United Kingdom"
        autoComplete="off"
        disabled
      />
    </>
  );
};

export default PersonalInfoDetail;
