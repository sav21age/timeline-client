import React, { useState } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { stringToColor } from "../../utils/strings";
import {
  Avatar, Button, Divider, IconButton, Link, ListItemIcon,
  ListItemText, Menu, MenuItem
} from "@mui/material";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import ExitToAppOutlinedIcon from "@mui/icons-material/ExitToAppOutlined";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { authAPI } from "../../store/api/authApi";
import { authSlice } from "../../store/slice/authSlice";
import { IUser } from "../../models/IUser";
import { ThemeSwitch } from '../ThemeSwitch';

function stringAvatar(name: string) {
  return {
    sx: {
      bgcolor: stringToColor(name),
      color: "#fff",
    },
    // children: `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`,
    children: `${name[0]}`,
  };
}

const NavbarContent = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  const handleMenu = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const { isAuth, data: userData } = useAppSelector(state => state.authReducer)

  const [signOutUser] = authAPI.useLazySignOutQuery();

  const handleSignOut = async () => {
    try {
      const res = await signOutUser();
      if (res) {
        dispatch(authSlice.actions.setAccessToken(""));
        dispatch(authSlice.actions.setIsAuth(false));
        dispatch(authSlice.actions.setData({} as IUser));
        navigate("/");
      }
    } catch (e) {
      // console.log(e);
    }

  };

  return (
    <>
      <ThemeSwitch />
      {isAuth ? (
        <>
          <IconButton onClick={handleMenu} sx={{ p: 0, marginLeft: "auto" }}>
            <Avatar {...stringAvatar(userData.username)} />
          </IconButton>
          <Menu
            id="navbar-menu"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <Link color="inherit" component={RouterLink} to="/">
              <MenuItem>
                <ListItemIcon>
                  <HomeOutlinedIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText>Home</ListItemText>
              </MenuItem>
            </Link>
            <Link color="inherit" component={RouterLink} to="/user/profile">
              <MenuItem>
                <ListItemIcon>
                  <AccountCircleOutlinedIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText>Profile</ListItemText>
              </MenuItem>
            </Link>
            <Divider />
            <MenuItem onClick={handleSignOut}>
              <ListItemIcon>
                <ExitToAppOutlinedIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText> Sign out</ListItemText>
            </MenuItem>
          </Menu>
        </>
      ) : (
        <Button
          component={RouterLink}
          to="/auth/sign-in"
          color="inherit"
          sx={{ marginLeft: "auto" }}
        >
          Sign in
        </Button>
      )}
    </>

  );
};

export default NavbarContent;
