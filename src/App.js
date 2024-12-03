import React, { useState } from "react";
import { Box, Grid, IconButton, Typography, Button, CssBaseline } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import BackspaceIcon from "@mui/icons-material/Backspace";
import { evaluate } from "mathjs";

// Themes with gradient backgrounds
const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: { main: "#90CAF9" },
    secondary: { main: "#81D4FA" },
    background: {
      default: "linear-gradient(to bottom, #A7C9FF, #E3F2FD)", 
      paper: "#FFFFFF",
    },
    text: { primary: "#000" },
  },
});

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: { main: "#0D47A1" },
    secondary: { main: "#1565C0" },
    background: {
      default: "linear-gradient(to bottom, #212121, #0D47A1)", 
      paper: "#1C1C1C",
    },
    text: { primary: "#FFF" },
  },
});

const Calculator = () => {
  const [display, setDisplay] = useState("0");
  const [isDarkMode, setIsDarkMode] = useState(false);

  const handleInput = (value) => {
    if (value === "C") {
      setDisplay("0");
    } else if (value === "=") {
      try {
        const expression = display.replace("×", "*").replace("÷", "/");
        const result = evaluate(expression);
        setDisplay(String(result % 1 !== 0 ? parseFloat(result.toFixed(4)) : result));
      } catch {
        setDisplay("Error");
      }
    } else if (value === "Backspace") {
      // Backspace logic
      setDisplay((prev) => (prev.length === 1 ? "0" : prev.slice(0, -1)));
    } else if (value === "+/-") {
      // Toggle sign
      setDisplay((prev) => (prev === "0" || prev === "Error" ? "0" : String(parseFloat(prev) * -1)));
    } else {
      setDisplay((prev) => (prev === "0" || prev === "Error" ? value : prev + value));
    }
  };

  return (
    <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
      <CssBaseline />
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
          background: (theme) => theme.palette.background.default,
        }}
      >
        <Box
          sx={{
            width: "360px",
            borderRadius: "24px",
            boxShadow: 5,
            backgroundColor: "background.paper",
            overflow: "hidden",
          }}
        >
          {/* Theme Toggle */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              padding: "8px",
              backgroundColor: "background.paper",
            }}
          >
            <IconButton onClick={() => setIsDarkMode((prev) => !prev)}>
              {isDarkMode ? <Brightness7Icon /> : <Brightness4Icon />}
            </IconButton>
          </Box>

          {/* Display */}
          <Box
            sx={{
              backgroundColor: "background.default",
              padding: "16px",
              fontSize: "2.5rem",
              textAlign: "right",
              fontWeight: "bold",
              height: "100px",
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              boxShadow: 2,
            }}
          >
            <Typography variant="h4" noWrap>
              {display}
            </Typography>
          </Box>

          {/* Keypad */}
          <Grid container spacing={1} sx={{ padding: "16px" }}>
            {keypad.map((key) => (
              <Grid item xs={key.label === "0" ? 6 : 3} key={key.label}>
                <Button
                  variant="contained"
                  color={key.type === "action" ? "secondary" : "primary"}
                  onClick={() => handleInput(key.value)}
                  sx={{
                    fontSize: "25px",
                    height: "80px",
                    borderRadius: key.label === "0" ? "50%" : "50%",
                    width: "100%",
                    boxShadow: 3,
                    backgroundColor:
                      key.type === "action"
                        ? "secondary.main"
                        : "primary.main",
                    "&:hover": {
                      backgroundColor:
                        key.type === "action"
                          ? "secondary.dark"
                          : "primary.dark",
                    },
                    ...(key.label === "0" && {
                      borderRadius: "60px", 
                    }),
                  }}
                >
                  {key.label === "Backspace" ? <BackspaceIcon /> : key.label}
                </Button>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

const keypad = [
  { label: "C", value: "C", type: "action" },
  { label: "Backspace", value: "Backspace", type: "action" },
  { label: "+/-", value: "+/-", type: "action" },
  { label: "÷", value: "÷", type: "action" },
  { label: "7", value: "7", type: "number" },
  { label: "8", value: "8", type: "number" },
  { label: "9", value: "9", type: "number" },
  { label: "×", value: "×", type: "action" },
  { label: "4", value: "4", type: "number" },
  { label: "5", value: "5", type: "number" },
  { label: "6", value: "6", type: "number" },
  { label: "-", value: "-", type: "action" },
  { label: "1", value: "1", type: "number" },
  { label: "2", value: "2", type: "number" },
  { label: "3", value: "3", type: "number" },
  { label: "+", value: "+", type: "action" },
  { label: "0", value: "0", type: "number" },
  { label: ".", value: ".", type: "decimal" },
  { label: "=", value: "=", type: "action" },
];

export default Calculator;
