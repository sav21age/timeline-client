import { Box } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import React from "react";

export const Loading = () => {
  return (
    <Box
      display="block"
      position="fixed"
      right="0"
      top="10"
      bottom="10"
      margin="10px 0"
      height="100%"
      width="100%"
      zIndex="100"
      // opacity="0.8"
      // backgroundColor="rgba(255, 255, 255, 0.8)"
    >
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        // height="100%"
        width="100%"
      >
        <CircularProgress disableShrink />
      </Box>
    </Box>
  );
};

// --

// export const Loading = () => {
//   const classes = useStyles();
//   return (
//     <div className={classes.parent}>
//       <Backdrop
//         className={classes.backdrop}
//         open={true}
//         sx={{
//           backgroundColor: "rgba(255, 255, 255, 0.5)",
//           zIndex: (theme) => theme.zIndex.drawer + 1,
//         }}
//       >
//         <CircularProgress disableShrink />
//       </Backdrop>
//     </div>
//   );
// };

// --

// const Loading = () => {
//   return (
//     <Stack alignItems="center" spacing={5} sx={{ border: "1px solid black"}}>
//       <LinearProgress />
//     </Stack>
//   );
// };
