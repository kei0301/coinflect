import React from "react";

import CssBaseline from '@mui/material/CssBaseline';
import useMediaQuery from "@mui/material/useMediaQuery";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { ThemeModeContext } from "../context/themmode"

import "../assets/scss/index.scss";

// ** Declare Theme Provider
const MaterialThemeProvider = ({ children }) => {
    const { isDark, language } = React.useContext(ThemeModeContext)

    const mobile = useMediaQuery('(min-width:800px)');
    const tablet = useMediaQuery('(min-width:1200px)');
    
    const themeConfig =
    {
        light: {
            fontSize: {
                xs: 10,
                sm: 12,
                md: 14,
                lg: 16,
                xl: 18
            },
            custom: {
                ButtonBorderRadius: 6,
            },
            typography: {
                fontFamily: "Helvetica",
                fontSize: 14,
            },
            isMobile: !mobile,
            isTablet: !tablet,
            language,
            palette: {
                mode: "light",
                background: {
                    default: "rgb(237 221 222 / 33%)",
                }
            },
            components: {
                MuiButton: {
                    defaultProps: {
                        disableRipple: true,
                    }
                },
                MuiIconButton: {
                    defaultProps: {
                        disableRipple: true,
                    }
                },
            }
        },
        dark: {
            fontSize: {
                xs: 10,
                sm: 12,
                md: 14,
                lg: 16,
                xl: 18
            },
            custom: {
                ButtonBorderRadius: 6,
            },
            typography: {
                fontFamily: "Helvetica",
                fontSize: 14,
            },
            isMobile: !mobile,
            isTablet: !tablet,
            language,
            palette: {
                mode: "dark",
                background: {
                    default: "#181722",
                    paper: "#181722"
                }
            },
            components: {
                MuiButton: {
                    defaultProps: {
                        disableRipple: true,
                    }
                },
                MuiIconButton: {
                    defaultProps: {
                        disableRipple: true,
                    }
                },
            }
        }
    }

    const theme = createTheme(isDark ? themeConfig.dark : themeConfig.light);

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            {children}
        </ThemeProvider>
    );
};

export default MaterialThemeProvider;
