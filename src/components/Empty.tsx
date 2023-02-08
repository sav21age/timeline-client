import React from "react";
import { Box, Typography } from "@mui/material";
import { Helmet } from 'react-helmet';

const Empty = () => {
  return (
    <>
      <Helmet>
        <title>Error</title>
      </Helmet>

      <Box
        display="block"
        position="fixed"
        right="0"
        top="10"
        height="100%"
        width="100%"
      >
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          height="35%"
          width="100%"
        >
          <Box>
            <Typography variant="h3">Empty :/</Typography>
            <Typography sx={{ marginTop: "10px" }} variant="h6">
              Well, nothing here...
            </Typography>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Empty;
