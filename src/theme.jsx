/**
 * Material UI theme
 * See for details: https://material-ui.com/customization/default-theme/?expand-path=$.palette
 * Martial Color tool: https://material.io/resources/color
 */
import { CssBaseline, StyledEngineProvider } from "@mui/material";

import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useAppSelector } from "./hooks/redux";

// import { lightBlue } from "@mui/material/colors";
import { useMemo } from "react";

/**
 * Material UI theme "front" colors, "back" colors are different for Light and Dark modes
 */
const FRONT_COLORS = {
  primary: {
    main: "#348C31", // Green 300
    contrastText: "#FFF",
  },
  secondary: {
    // main: "#ffb74d", // Orange 300
    main: "#FFEA00", // Orange 300
    contrastText: "#000",
  },
  info: {
    main: "#0277bd", // Light Blue 800
    contrastText: "#FFF",
  },
  success: {
    main: "#2e7d32", // Green 800
    contrastText: "#FFF",
  },
  warning: {
    main: "#f9a825", // Yellow 800
    contrastText: "#FFF",
  },
  error: {
    main: "#c62828", // Red 800
    contrastText: "#FFF",
  },
  // action: {
  //   active: lightBlue[200],
  //   activeOpacity: 1,
  //   hover: lightBlue[100],
  //   hoverOpacity: 0.7,
  //   focus: lightBlue[600],
  //   focusOpacity: 1,
  //   selected: lightBlue[300],
  //   selectedOpacity: 1,
  // },
};

/**
 * Material UI theme config for "Light Mode"
 */
const LIGHT_THEME = {
  palette: {
    mode: "light",
    background: {
      //  paper: '#f5f5f5', // Gray 100 - Background of "Paper" based component
      paper: "#fff",
      default: "#fff",
    },
    ...FRONT_COLORS,
    win: {
      main: "#f7fcfa", // Red 800
      contrastText: "#000",
    },
    lose: {
      main: "#fffafa", // Red 800
      contrastText: "#000",
    },
    equal: {
      main: "#fffff7", // Red 800
      contrastText: "#000",
    },
  },
};

/**
 * Material UI theme config for "Dark Mode"
 */
const DARK_THEME = {
  palette: {
    mode: "dark",
    background: {
      paper: "#424242", // Gray 800 - Background of "Paper" based component
      default: "#424242",
    },
    ...FRONT_COLORS,
    win: {
      // main: "#097969", // Red 800
      main: "#404543", // Red 800
      contrastText: "#000",
    },
    lose: {
      // main: "#811331", // Red 800
      main: "#484040", // Red 800
      contrastText: "#fff",
    },
    equal: {
      // main: "#E49B0F", // Red 800
      main: "#484840", // Red 800
      contrastText: "#000",
    },
  },
};

/**
 * Material UI Provider with Light and Dark themes depending on global "state.darkMode"
 */

// const AppThemeProvider = ({ children }: { children: JSX.Element }) => {
const AppThemeProvider = ({ children }) => {
  const { darkMode } = useAppSelector((state) => state.appReducer);

  const theme = useMemo(() => {
    return createTheme(darkMode === true ? DARK_THEME : LIGHT_THEME);
  }, [darkMode]);

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </StyledEngineProvider>
  );
};

// export { AppThemeProvider, LIGHT_THEME, DARK_THEME };
export { AppThemeProvider};
