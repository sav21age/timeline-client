import Container from "@mui/material/Container";
import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/navbar/Navbar";
import { Footer } from './../components/Footer';

export const PageLayout = () => (
  <>
    <Container disableGutters maxWidth="xl">
      <Navbar />
      <Outlet />
    </Container>
    <Footer />
  </>
);
