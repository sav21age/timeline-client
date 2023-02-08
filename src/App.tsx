import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import AppRouter from "./routers/AppRouter";
import { AppThemeProvider } from "./theme"
import { setupStore } from "./store/index"
import { Box, CssBaseline } from "@mui/material";
import { appConfig } from "./appConfig";

function App() {
  const store = setupStore();
  return (
    <Provider store={store}>
      <AppThemeProvider>
        <BrowserRouter>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              minHeight: "100vh",
              backgroundImage: `url(${appConfig.BACKGROUND_IMAGE})`,
            }}
          >
            <CssBaseline />
            <AppRouter />
          </Box>
        </BrowserRouter>
      </AppThemeProvider>
    </Provider>
  );
}

export default App;
