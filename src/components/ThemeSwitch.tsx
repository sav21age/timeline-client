import React from "react";
import { IconButton } from "@mui/material";
import { Nightlight, LightMode } from "@mui/icons-material";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { appSlice } from "../store/slice/appSlice";
import { setCookie, deleteCookie } from "../utils/cookies";

export const ThemeSwitch = () => {
  const dispatch = useAppDispatch();
  const { darkMode } = useAppSelector(state => state.appReducer)

  const handleClick = () => {
    const name = "darkMode";
    if (darkMode === true) {
      dispatch(appSlice.actions.setDarkMode(false));
      deleteCookie(name)
    } else {
      dispatch(appSlice.actions.setDarkMode(true));
      setCookie(name, "1")
    }
  };

  return (
    <IconButton
      sx={{ mr: 1, mb: "3px", 
        // transform: "scaleX(-1) rotate(-45deg)", 
        transform: "rotate(-155deg)", 
    }}
      onClick={handleClick}
      color="secondary"

    >
      {darkMode === true ? <LightMode fontSize="small" /> : <Nightlight fontSize="small" />}
    </IconButton>
  );
};

// import * as React from "react";
// import IconButton from "@mui/material/IconButton";
// import Box from "@mui/material/Box";
// import { useTheme, ThemeProvider, createTheme } from "@mui/material/styles";
// import Brightness4Icon from "@mui/icons-material/Brightness4";
// import Brightness7Icon from "@mui/icons-material/Brightness7";

// const ColorModeContext = React.createContext({ toggleColorMode: () => {} });

// function MyApp() {
//   const theme = useTheme();
//   const colorMode = React.useContext(ColorModeContext);
//   return (
//     <Box
//       sx={{
//         display: "flex",
//         width: "100%",
//         alignItems: "center",
//         justifyContent: "center",
//         bgcolor: "background.default",
//         color: "text.primary",
//         borderRadius: 1,
//         p: 3,
//       }}
//     >
//       {theme.palette.mode} mode
//       <IconButton
//         sx={{ ml: 1 }}
//         onClick={colorMode.toggleColorMode}
//         color="inherit"
//       >
//         {theme.palette.mode === "dark" ? (
//           <Brightness7Icon />
//         ) : (
//           <Brightness4Icon />
//         )}
//       </IconButton>
//     </Box>
//   );
// }

// export default function ToggleColorMode() {
//   const [mode, setMode] = React.useState("light");
//   const colorMode = React.useMemo(
//     () => ({
//       toggleColorMode: () => {
//         setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
//       },
//     }),
//     []
//   );

//   const theme = React.useMemo(
//     () =>
//       createTheme({
//         palette: {
//           mode,
//         },
//       }),
//     [mode]
//   );

//   return (
//     <ColorModeContext.Provider value={colorMode}>
//       <ThemeProvider theme={theme}>
//         <MyApp />
//       </ThemeProvider>
//     </ColorModeContext.Provider>
//   );
// }
