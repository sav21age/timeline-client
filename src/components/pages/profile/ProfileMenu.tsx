import {
  LanguageOutlined,
  PersonOutlineOutlined,
  ShieldOutlined,
} from "@mui/icons-material";
import {
  Link,
  ListItemIcon,
  ListItemText,
  MenuItem,
  MenuList,
} from "@mui/material";
import React from "react";
import { Link as RouterLink, useLocation } from "react-router-dom";
import userEndpoint from "../../../endpoints/userEndpoint";

const ProfileMenu = () => {
  const { pathname } = useLocation();
  return (
    <MenuList sx={{ marginTop: "1em" }}>
      <Link color="inherit" component={RouterLink} to={`${userEndpoint.getProfile()}`}>
        <MenuItem selected={`${userEndpoint.getProfile()}` === pathname}>
          <ListItemIcon>
            <PersonOutlineOutlined fontSize="small" />
          </ListItemIcon>
          <ListItemText>Profile</ListItemText>
        </MenuItem>
      </Link>
      <Link color="inherit" component={RouterLink} to={`${userEndpoint.getPersonalInfo()}`}>
        <MenuItem selected={`${userEndpoint.getPersonalInfo()}` === pathname}>
          <ListItemIcon>
            <LanguageOutlined fontSize="small" />
          </ListItemIcon>
          <ListItemText>Personal information</ListItemText>
        </MenuItem>
      </Link>
      <Link color="inherit" component={RouterLink} to={`${userEndpoint.getSecurity()}`}>
        <MenuItem selected={`${userEndpoint.getSecurity()}` === pathname}>
          <ListItemIcon>
            <ShieldOutlined fontSize="small" />
          </ListItemIcon>
          <ListItemText>Security</ListItemText>
        </MenuItem>
      </Link>
    </MenuList>
  );
};

export default ProfileMenu;
