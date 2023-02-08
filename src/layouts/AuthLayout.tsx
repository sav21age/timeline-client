import { Box, Container } from "@mui/material";
import React from "react";
import { Outlet } from 'react-router-dom';

export const AuthLayout = () => {
  return (
    <Container maxWidth="xs">
      <Box sx={{ marginTop: 10}}>
        <Outlet />
      </Box>
    </Container>
  );
};
