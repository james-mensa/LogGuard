"use client"
import React, { Suspense } from "react";
import {ThemeProvider, createTheme } from "@mui/material/styles";
import { Box, Container } from "@mui/material";
import { ModeType } from "../utils";
import BasicAppBar from "../component/BasicAppBar";
import { ToastContainer } from "react-toastify";
import { Toaster } from "react-hot-toast";

export const ColorModeContext = React.createContext({
  toggleColorMode: () => {},
});

export default function Theme({ children }: { children: React.ReactNode }) {
  const [mode, setMode] = React.useState<ModeType>("light");

  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
      },
    }),
    []
  );

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
      }),
    [mode]
  );

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <Box
          sx={(theme) => ({
            ...styles.container,
            backgroundColor: theme.palette.mode==='dark' ?  theme.palette.background.default:'',
          })}
        >
          <BasicAppBar mode={mode} />
          
          <Suspense fallback={<Box></Box>}>
            <Container
              sx={{
                ...styles.main,
              }}
            >
               <Toaster position="top-center" />
              {children}
            </Container>
          </Suspense>
          <Box sx={{ zIndex: 1000000 }}>
            <ToastContainer
              hideProgressBar={true}
              stacked={true}
              autoClose={1000}
            />
          </Box>
        </Box>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

const styles = {
  container: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    minHeight: "100vh",
  },
  main: {
    display: "flex",
    justifyContent: "center",
    marginTop: "50px",
    
  },
};
