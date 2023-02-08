import React from "react";
import { Box } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { Link } from "@mui/material";
import { Helmet } from "react-helmet";

const styles = {
  Container: {
    display: "block",
    position: "fixed",
    right: "0",
    top: "10",
    height: "100%",
    width: "100%",
    backgroundImage:
      "url('/media/background/ivars-utinans-kl4s22nlDNw-unsplash.jpg')",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
  },
  Parent: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "70%",
    width: "100%",
  },
  Child: {
    padding: "0 35px 15px",
    maxWidth: "400px",
    backgroundColor: "rgba(255, 255, 255, 0.75)",
    textAlign: "justify",
  }
}

const NotFound = () => {
  return (
    <>
      <Helmet>
        <title>Error 404</title>
      </Helmet>
      <Box sx={styles.Container}>
        <Box sx={styles.Parent}>
          <Box sx={styles.Child}>
            <h1>Error 404</h1>
            <h3>
              This is not the page you're looking for...
            </h3>
            <p>
              The page is no longer exists. Return to the{" "}
              <Link
                underline="always"
                color="#000"
                component={RouterLink}
                to="/"
              >
                home
              </Link>{" "}
              page and remember: you haven't seen anything.
            </p>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default NotFound;
