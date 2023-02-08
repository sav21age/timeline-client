import { Outlet } from "react-router-dom";
import { Box, Container, Grid } from "@mui/material";
import Navbar from '../components/navbar/Navbar';
import ProfileMenu from '../components/pages/profile/ProfileMenu';
import { Footer } from './../components/Footer';

export const ProfileLayout = () => (
  <>
    <Container disableGutters maxWidth="xl">
      <Navbar />
      <Grid container spacing={1}>
        <Grid item xs={12} sm={4} md={3} >
          <ProfileMenu />
        </Grid>
        <Grid item xs={12} sm={8} md={9}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Outlet />
          </Box>
        </Grid>
      </Grid>
    </Container>
    <Footer />
  </>
);
