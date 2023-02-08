import { AppBar, Box, Link, Toolbar, Typography } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { appConfig } from "../../appConfig";
import Picture from '../Picture';
import NavbarContent from './NavbarContent';

const Navbar = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" elevation={0} sx={{ backgroundColor: "primary.main" }}>
        <Toolbar>
          <Link
            component={RouterLink}
            to="/"
            style={{ marginTop: "5px" }}
            title="Pedites Sphera Tempus Linea"
          >
            <Picture
              path={`${appConfig.MEDIA_ROOT}/logo_white.svg`}
              alt="football timeline logo"
              width="40"
              height="40"
            />
          </Link>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Link
              component={RouterLink}
              to="/"
              style={{ color: "white", textDecoration: "none", marginLeft: "10px" }}
              title="Pedites Sphera Tempus Linea"
            >
              football timeline
            </Link>
          </Typography>
          <NavbarContent />
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;
