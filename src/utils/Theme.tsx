import { createTheme } from "@mui/material";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

export const themeApp = createTheme({
    typography: {
        allVariants: {
            textTransform: "none",
        },
        fontFamily: "Inter",
    },

    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    textTransform: "none",
                    border: "0px",
                    fontSize: "17px",
                    "&:focus": {
                        outline: "none",
                    },
                    "&:active": {
                        boxShadow: "none",
                    },
                    "&:hover": {
                        backgroundColor: "transparent",
                    },
                },
            },
        },

        MuiCircularProgress: {
            styleOverrides: {
                root: {
                    border: "0px",
                    "&:focus": {
                        outline: "none",
                    },
                    "&:active": {
                        boxShadow: "none",
                    },
                },
            },
        },

        MuiIconButton: {
            styleOverrides: {
                root: {
                    textTransform: "none",
                    border: "0px",
                    "&:focus": {
                        outline: "none",
                    },
                    "&:active": {
                        boxShadow: "none",
                    },
                },
            },
        },

        MuiOutlinedInput: {
            styleOverrides: {
                root: {
                    textTransform: "none",
                    border: "0px",
                    "&:focus": {
                        outline: "none",
                    },
                    "&:active": {
                        boxShadow: "none",
                    },
                    "&:hover": {
                        border: "0px"
                    },
                },
            },
        }
    },

    palette: {
        primary: { main: "#000000", dark: "#000000", contrastText: "#CCCCCC" },
        secondary: { main: "#456086", dark: "#CCC1BE" },
        action: { active: "#000" },
    },

    breakpoints: {
        values: {
            xs: 0,
            sm: 600,
            md: 900,
            lg: 1200,
            xl: 1536,
        },
    },
});
