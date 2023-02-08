import { Outlet } from "react-router-dom";
import ProfileMenu from "../components/Profile/ProfileMenu";
import { Box, Grid } from "@mui/material";
import Navbar from '../../components/UI/Navbar/Navbar';

export const ProfileContainer = ({ children }) => (
  <>
    <Navbar />
    <Grid container component="main">
      <Grid item sm={12} md={3}>
        <ProfileMenu />
      </Grid>
      <Grid item sm={12} md={9}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {children}
        </Box>
      </Grid>
    </Grid>
  </>
);
