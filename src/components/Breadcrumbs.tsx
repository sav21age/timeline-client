import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { Link, Typography, Breadcrumbs } from "@mui/material";

export const BreadcrumbList = ({ children }: { children: JSX.Element[] }) => {
  return (
    <Breadcrumbs aria-label="breadcrumb" className="breadcrumbs">
      {children}
    </Breadcrumbs>
  );
};

export const BreadcrumbHome = () => {
  return (
    <Link underline="hover" color="inherit" component={RouterLink} to="/">
      Home
    </Link>
  );
};

export const BreadcrumbLink = ({ name, url }: { name: string | undefined, url: string }) => {
  return (
    <Link underline="hover" color="inherit" component={RouterLink} to={url}>
      {name}
    </Link>
  );
};

export const BreadcrumbItem = ({ name }: { name: string | undefined}) => {
  return <Typography color="text.primary">{name}</Typography>;
};
