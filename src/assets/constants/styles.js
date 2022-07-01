import { makeStyles } from "@mui/styles";
import { alpha } from "@mui/system";

const useStyles = makeStyles((theme) => {
    return {
        appbar: {
            "& .header": {
                backgroundColor: "transparent !important",
                padding: theme.isMobile ? `${theme.spacing(0.75, 2)}` : theme.isTablet ? `${theme.spacing(0.75, 5)}` : `${theme.spacing(0.75, 11)}`,
                backgroundImage: "none !important",
                boxShadow: "none !important",
                "&.top": {
                    backgroundColor: theme.palette.mode === "light" ? "rgb(255 255 255 / 50%) !important" : "rgb(0 0 0 / 50%) !important"
                },
                "& .MuiToolbar-root": {
                    padding: "0px !important",
                },
                '& .MuiPaper-root': {
                    borderRadius: 6,
                    marginTop: theme.spacing(1),
                    minWidth: 180,
                    color: theme.palette.mode === 'light' ? 'rgb(55, 65, 81)' : theme.palette.grey[300],
                    boxShadow:
                        'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
                    '& .MuiMenu-list': {
                        padding: '4px 0',
                    },
                    '& .MuiMenuItem-root': {
                        '& .MuiSvgIcon-root': {
                            fontSize: 18,
                            color: theme.palette.text.secondary,
                            marginRight: theme.spacing(1.5),
                        },
                        '&:active': {
                            backgroundColor: alpha(
                                theme.palette.primary.main,
                                theme.palette.action.selectedOpacity,
                            ),
                        },
                    },
                },
                "& button": {
                    marginLeft: theme.spacing(4),
                    borderColor: theme.palette.mode === 'light' ? "black" : "white",
                    color: theme.palette.mode === 'light' ? "black" : "white",
                    padding: "6px 20px",
                    borderRadius: theme.custom.ButtonBorderRadius,
                    fontSize: 17,
                    fontWeight: 600
                },
                "& .active-wallet-icon": {
                    width: "20px",
                    marginLeft: 10
                },
                "& .headerbar-drop-button": {
                    minWidth: theme.spacing(11),
                    fontSize: theme.fontSize.md,
                    paddingLeft: 0,
                    paddingRight: 0,
                    fontWeight: 500,
                    textTransform: "unset",
                    "&:hover": {
                        background: "transparent"
                    }
                },
                "& .mode-btn": {
                    borderRadius: "100px",
                    border: "none",
                    padding: theme.spacing(1.2),
                    marginRight: theme.spacing(0),
                    marginLeft: theme.spacing(2),
                    color: "#5AB489",
                    "&:hover": {
                        background: "transparent"
                    }
                },
                "& .logo": {
                    width: theme.isMobile ? theme.spacing(13) : theme.spacing(13)
                },
                "& .wallet-btn": {
                    backgroundColor: theme.palette.mode === 'light' ? "#4B8AEB" : "#66DC95",
                    color: theme.palette.mode === 'light' ? "white" : "black",
                    fontSize: theme.isMobile ? "12px" : theme.fontSize.md,
                    textTransform: "unset",
                    fontWeight: 500,
                    boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
                    borderRadius: theme.custom.ButtonBorderRadius
                },
                "& .wallet-btn:hover": {
                    backgroundColor: theme.palette.mode === 'light' ? "#4B8AEB" : "#66DC95",
                    boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
                }
            }
        },
        headermenu: {
            height: theme.spacing(62.5),
            "& .MuiPaper-root": {
                background: theme.palette.mode === 'light' ? "white" : "rgba(0, 0, 0, 0.8)",
                backgroundImage: "none",
                height: theme.isMobile ? 250 : 300,
            },
            "& ul": {
                "& li": {
                    justifyContent: "center",
                    minHeight: "0px !important",
                    lineHeight: 1.2,
                    fontSize: theme.fontSize.md,
                    "&:hover": {
                        color: theme.palette.mode === "light" ? "#027AFF" : "#66dc95",
                        background: "transparent"
                    }
                }
            }
        },
        currencymenu: {
            height: theme.spacing(62.5),
            "& .MuiPaper-root": {
                width: 95,
                background: theme.palette.mode === 'light' ? "white" : "rgba(0, 0, 0, 0.8)",
                backgroundImage: "none",
                marginTop: 1,
                height: theme.isMobile ? 250 : 300
            },
            "& ul": {
                "& li": {
                    justifyContent: "center",
                    minHeight: "0px !important",
                    lineHeight: 1.2,
                    fontSize: theme.fontSize.md,
                    "&:hover": {
                        color: theme.palette.mode === "light" ? "#027AFF" : "#66dc95",
                        background: "transparent"
                    }
                }
            }
        },
        languagemenu: {
            height: theme.spacing(62.5),
            marginLeft: () => {
                if (theme.isMobile) {
                    return 45;
                }
                switch (theme.language) {
                    case 'Indonesian':
                        return -10;
                    case 'Finnish':
                        return 0;
                    default:
                        return 20;
                }
            },
            "& .MuiPaper-root": {
                background: theme.palette.mode === 'light' ? "white" : "rgba(0, 0, 0, 0.8)",
                backgroundImage: "none",
                marginTop: 1,
                height: theme.isMobile ? 250 : 300
            },
            "& ul": {
                "& li": {
                    justifyContent: "center",
                    minHeight: "0px !important",
                    lineHeight: 1.2,
                    fontSize: theme.fontSize.md,
                    "&:hover": {
                        color: theme.palette.mode === "light" ? "#027AFF" : "#66dc95",
                        background: "transparent"
                    }
                }
            }
        },
        filter: {
            "& .MuiPaper-root": {
                marginTop: 1,
                background: theme.palette.mode === 'light' ? "white" : "rgba(0, 0, 0, 0.8)",
                top: 56,
                height: theme.isTablet && !theme.isMobile ? 200 : 'auto'
            },
            "& ul": {
                "& li": {
                    minHeight: "0px !important",
                    lineHeight: 1.2,
                    fontSize: theme.fontSize.md,
                    "&:hover": {
                        color: theme.palette.mode === "light" ? "#027AFF" : "#66dc95",
                        background: "transparent"
                    }
                }
            }
        },
        cWallet: {
            "& .cwallet-paper": {
                padding: theme.spacing(2),
                width: theme.spacing(45),
                "& .title": {
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: theme.spacing(0.625),
                    "& > div": {
                        padding: theme.spacing(0),
                        flexGrow: 1,
                        "& h2": {
                            padding: theme.spacing(1, 2),
                            marginRight: theme.spacing(0.625),
                        }
                    },
                    "& > button": {
                        width: theme.spacing(6.25),
                        height: theme.spacing(6.25)
                    }
                },
                "& .content": {
                    padding: theme.spacing(1, 0, 0, 0),
                    "& > ul": {
                        paddingBottom: 0,
                        "& .item": {
                            padding: theme.spacing(0.625, 2),
                            margin: theme.spacing(2, 0),
                            cursor: "pointer",
                            "& .symbol": {
                                minWidth: theme.spacing(5.5),
                                "& svg": {
                                    fontSize: theme.spacing(3.5),
                                },
                                "& img": {
                                    width: `${theme.spacing(3.5)} !important`
                                },
                                "& .walletIcon": {
                                    width: `35px`
                                }
                            },
                            "& .activating-description": {
                                padding: theme.spacing(0.5625, 2),
                                margin: 0,
                                "& p": {
                                    fontSize: theme.spacing(1.375)
                                }
                            },
                            "& .description": {
                                padding: theme.spacing(1.5, 2),
                                margin: 0,
                            },
                        },
                        "& .action": {
                            "& button": {
                                marginRight: theme.spacing(1),
                                "& svg": {
                                }
                            }
                        },
                        "& .state": {
                            paddingTop: theme.spacing(4),
                            paddingBottom: theme.spacing(4),
                            "& .symbol": {
                                display: "flex",
                                justifyContent: "center",
                                "& .MuiCircularProgress-root": {
                                    width: `${theme.spacing(3.5)}px !important`,
                                    height: `${theme.spacing(3.5)}px !important`
                                }
                            },
                            "& .description": {
                                padding: theme.spacing(1.5, 1),
                            }
                        },
                        "& .activating-item": {
                            marginBottom: 0,
                        }
                    }
                }
            },
        },
        AppContainer: {
            padding: theme.isMobile ? `0px ${theme.spacing(2)}` : theme.isTablet ? `0px ${theme.spacing(5)}` : `0px ${theme.spacing(11)}`,
            paddingTop: 90
        },
        AnimationBG: {
            zIndex: 0,
            width: "100%",
            height: "100%",
            position: "fixed",
            left: 0,
            top: 0,
            overflow: "hidden",
            filter: "blur(70px)",
            "& > div": {
                zIndex: 0,
                borderRadius: "100%",
                position: "absolute",
                transition: "1s",
                opacity: 0.75
            },
            "& .circle-1": {
                background: "#5AB489",
                width: theme.spacing(40),
                height: theme.spacing(40),
            },
            "& .circle-2": {
                background: "#66DC95",
                width: theme.spacing(30),
                height: theme.spacing(30),
            },
            "& .circle-3": {
                background: "#66DC95",
                width: theme.spacing(35),
                height: theme.spacing(35),
            },
            "& .circle-4": {
                background: "#8EC7FF",
                width: theme.spacing(32),
                height: theme.spacing(32),
            },
            "& .circle-5": {
                background: "#4B8AEB",
                width: theme.spacing(45),
                height: theme.spacing(45),
            },
            "& .circle-6": {
                background: "#4B8AEB",
                width: theme.spacing(38),
                height: theme.spacing(38),
            },
        },
        laptopControlBar: {
            alignItems: "center",
            borderBottom: theme.palette.mode === "light" ? "0.5px solid black" : "0.5px solid white",
            marginBottom: "10px",
            flexDirection: "row !important",
            justifyContent: "space-between",
            zIndex: 100,
            "& > h6": {
                width: theme.spacing(25),
                fontSize: theme.fontSize.xl
            },
            "& .active-btn-box": {
                flexDirection: "row",
                "& label": {
                    marginLeft: -8
                },
                "& button": {
                    width: theme.spacing(19),
                    backgroundColor: "white",
                    color: "#bfbfbf",
                    borderRadius: theme.spacing(1),
                    padding: theme.spacing(0.5),
                    fontSize: theme.fontSize.md,
                    boxShadow: "none"
                },
                "& button.active": {
                    backgroundColor: "#DCE8FF",
                    color: "#0155FF",
                },
                "& span": {
                    fontSize: theme.fontSize.sm
                }
            },
            "& .search-filter-box": {
                "& > div": {
                    justifyContent: "flex-end",
                    flexDirection: "row"
                },
                "& button": {
                    color: theme.palette.mode === "light" ? "black" : "white",
                    fontWeight: 500,
                    textTransform: "unset",
                    fontSize: theme.fontSize.md,
                    marginLeft: theme.spacing(1),
                    "&:hover": {
                        background: "transparent"
                    }
                },
                "& .search": {
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                    "& input": {
                        padding: '0px !important',
                        marginLeft: theme.spacing(1),
                        width: theme.spacing(10),
                        border: "none",
                        background: "none",
                        fontSize: theme.fontSize.md,
                        color: theme.palette.mode === "light" ? "black" : "white",
                        "&:hover": {
                            outline: '-webkit-focus-ring-color auto 0px'
                        },
                        "&:focus-visible": {
                            outline: '-webkit-focus-ring-color auto 0px'
                        },
                        "&::placeholder": {
                            color: theme.palette.mode === "light" ? "black" : "white"
                        }
                    }
                }
            },
        },
        tabletControlbar: {
            alignItems: "center",
            marginBottom: "10px",
            justifyContent: "space-between",
            zIndex: 100,
            "& > h6": {
                width: theme.spacing(45),
            },
            "& .active-btn-box": {
                flexDirection: "row",
                width: `100%`,
                "& label": {
                    margin: 0,
                    "& > span": {
                        marginLeft: 0,
                        fontSize: 14,
                    }
                },
                "& button": {
                    width: theme.spacing(19),
                    backgroundColor: "white",
                    color: "#bfbfbf",
                    borderRadius: theme.spacing(1),
                    padding: theme.spacing(0.5),
                    fontSize: theme.fontSize.md,
                    boxShadow: "none"
                },
                "& button.active": {
                    backgroundColor: "#DCE8FF",
                    color: "#0155FF",
                }
            },
            "& .search-filter-box": {
                width: `100%`,
                borderBottom: theme.palette.mode === "light" ? "0.5px solid black" : "0.5px solid white",
                flexDirection: "row",
                justifyContent: "space-between",
                "& > div": {
                    justifyContent: "space-between",
                    flexDirection: "row"
                },
                "& button": {
                    color: theme.palette.mode === "light" ? "black" : "white",
                    fontWeight: 500,
                    textTransform: "unset",
                    fontSize: theme.fontSize.md,
                    "&:hover": {
                        background: "transparent"
                    }
                },
                "& .search": {
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                    "& input": {
                        padding: '0px !important',
                        marginLeft: theme.spacing(1),
                        width: theme.spacing(10),
                        border: "none",
                        background: "none",
                        fontSize: theme.fontSize.md,
                        color: theme.palette.mode === "light" ? "black" : "white",
                        "&:hover": {
                            outline: '-webkit-focus-ring-color auto 0px'
                        },
                        "&:focus-visible": {
                            outline: '-webkit-focus-ring-color auto 0px'
                        },
                        "&::placeholder": {
                            color: theme.palette.mode === "light" ? "black" : "white"
                        }
                    }
                }
            }
        },
        mobileControlbar: {
            alignItems: "center",
            marginBottom: "10px",
            justifyContent: "space-between",
            zIndex: 100,
            padding: theme.spacing(0, 2),
            "& > h6": {
                width: theme.spacing(45),
            },
            "& .active-btn-box": {
                flexDirection: "row",
                width: `100%`,
                "& label": {
                    margin: 0,
                    "& > span": {
                        marginLeft: 0,
                        fontSize: 14,
                    }
                },
                "& button": {
                    width: theme.spacing(19),
                    backgroundColor: "white",
                    color: "#bfbfbf",
                    borderRadius: theme.spacing(1),
                    padding: theme.spacing(0.5),
                    fontSize: theme.fontSize.md,
                    boxShadow: "none"
                },
                "& button.active": {
                    backgroundColor: "#DCE8FF",
                    color: "#0155FF",
                }
            },
            "& .search-filter-box": {
                width: `100%`,
                borderBottom: theme.palette.mode === "light" ? "0.5px solid black" : "0.5px solid white",
                "& > div": {
                    justifyContent: "space-between",
                    flexDirection: "row"
                },
                "& button": {
                    color: theme.palette.mode === "light" ? "black" : "white",
                    fontWeight: 500,
                    textTransform: "unset",
                    fontSize: theme.fontSize.md,
                    "&:hover": {
                        background: "transparent"
                    }
                },
                "& .search": {
                    width: 90,
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                    "& input": {
                        padding: '0px !important',
                        marginLeft: theme.spacing(1),
                        width: "100%",
                        border: "none",
                        background: "none",
                        fontSize: theme.fontSize.md,
                        color: theme.palette.mode === "light" ? "black" : "white",
                        "&:hover": {
                            outline: '-webkit-focus-ring-color auto 0px'
                        },
                        "&:focus-visible": {
                            outline: '-webkit-focus-ring-color auto 0px'
                        },
                        "&::placeholder": {
                            color: theme.palette.mode === "light" ? "black" : "white"
                        }
                    }
                }
            },
            "& .mobile-language-button": {
                "& > .MuiButton-endIcon": {
                    marginLeft: '0px !important'
                }
            },
        },
        Home: {
            display: "flex",
            flexDirection: "column",
            "& .state-bar": {
                justifyContent: "space-between",
                flexDirection: "row",
                width: theme.isTablet ? "100%" : 900,
                alignSelf: "center",
                margin: `${theme.spacing(2.5, 0, 0, 0)}`,
                zIndex: 100,
                "& .state-daily-chart": {
                    marginTop: -15
                },
                "& > div": {
                    background: theme.palette.mode === "light" ? "rgba(0, 0, 0, 0.7)" : "rgba(255, 255, 255, 0.1)",
                    padding: "10px 15px",
                    borderRadius: theme.spacing(1),
                    boxShadow: "0px 6.38599px 14.0241px rgba(0, 0, 0, 0.07)",
                    minWidth: theme.spacing(15),
                    width: "100%",
                    "& > h6": {
                        fontSize: theme.fontSize.sm,
                        color: "white"
                    },
                    "& span": {
                        color: "white"
                    },
                    "& > div": {
                        "& h5": {
                            fontSize: theme.fontSize.xl,
                            color: 'white'
                        },
                        "& .state-percent": {
                            fontSize: theme.fontSize.md,
                            lineHeight: 1
                        },
                        "&.styled": {
                            justifyContent: "center",
                            height: "60%"
                        }
                    }
                }
            },
            "& .token-state": {
                minWidth: '260px !important',
                "& > div": {
                    justifyContent: "space-between",
                    "& > div": {
                        width: "100%"
                    },
                    "& img": {
                        width: "100%"
                    }
                }
            },
            "& > div": {
                width: "100%",
            },
            "& .styled-switch": {
                width: 30,
                height: 15,
                padding: 0,
                '& .MuiSwitch-switchBase': {
                    padding: 0,
                    margin: 2,
                    transitionDuration: '300ms',
                    '&.Mui-checked': {
                        transform: 'translateX(16px)',
                        color: '#fff',
                        '& + .MuiSwitch-track': {
                            backgroundColor: theme.palette.mode === 'dark' ? '#66DC95' : '#027AFF',
                            opacity: 1,
                            border: 0,
                        },
                        '&.Mui-disabled + .MuiSwitch-track': {
                            opacity: 0.5,
                        },
                    },
                    '&.Mui-focusVisible .MuiSwitch-thumb': {
                        color: '#33cf4d',
                        border: '6px solid #fff',
                    },
                    '&.Mui-disabled .MuiSwitch-thumb': {
                        color:
                            theme.palette.mode === 'light'
                                ? theme.palette.grey[100]
                                : theme.palette.grey[600],
                    },
                    '&.Mui-disabled + .MuiSwitch-track': {
                        opacity: theme.palette.mode === 'light' ? 0.7 : 0.3,
                    },
                },
                '& .MuiSwitch-thumb': {
                    boxSizing: 'border-box',
                    width: 11,
                    height: 11,
                },
                '& .MuiSwitch-track': {
                    borderRadius: 15 / 2,
                    backgroundColor: theme.palette.mode === 'light' ? '#5A5A5A' : '#5A5A5A',
                    opacity: 1,
                    transition: theme.transitions.create(['background-color'], {
                        duration: 500,
                    }),
                },
            },
            "& .vault-lists": {
                padding: !theme.isMobile && theme.isTablet ? theme.spacing(5, 10) : theme.spacing(5, 0),
                zIndex: 100,
                display: "flex",
                flexDirection: "column",
                "& .disabled": {
                    color: "white",
                    cursor: "not-allowed",
                    "& input": {
                        cursor: "not-allowed",
                    }
                },
                "& .disabled-mb": {
                    color: "#d5d5d5 !important",
                    cursor: "not-allowed",
                    "& input": {
                        cursor: "not-allowed",
                    }
                },
                "& .bg-white": {
                    background: "white !important",
                },
                "& .text-red": {
                    color: "red"
                },
                "& .help": {
                    flexDirection: "row",
                    alignItems: "center",
                    "& svg": {
                        marginBottom: 3
                    }
                },
                "& > div > div": {
                    boxShadow: theme.palette.mode === "light" ? "1px 1px 15px rgb(255 255 255 / 24%)" : "1px 1px 15px rgb(0 0 0 / 24%)",
                    padding: theme.isMobile ? theme.spacing(2, 2) : theme.isTablet ? theme.spacing(2, 3) : theme.spacing(2, 5),
                    borderRadius: theme.spacing(1),
                    marginBottom: theme.spacing(1.5),
                    background: theme.palette.mode === 'light' ? "rgba(0, 0, 0, 0.7)" : "rgba(255, 255, 255, 0.1)",
                    flexDirection: "column",
                    width: "100%",
                    color: "white",
                    "& > .item-box": {
                        flexDirection: "row",
                        width: "100%",
                        justifyContent: "space-between",
                        "& > div": {
                            justifyContent: "space-between"
                        }
                    },
                    "& .title": {
                        fontSize: theme.fontSize.md
                    },
                    "& .sub-title": {
                        fontSize: theme.fontSize.lg
                    },
                    "& .value": {
                        fontSize: theme.fontSize.xl
                    },
                    "& .sub-description": {
                        fontSize: theme.fontSize.sm
                    },
                    "& .description": {
                        fontSize: theme.fontSize.xs
                    },
                    "& .w-50": {
                        width: "50%"
                    },
                    "& .item-1": {
                        width: 160,
                        marginRight: -40,
                        justifyContent: "center !important",
                        "& > div": {
                            alignItems: "flex-start",
                            justifyContent: "space-between",
                            lineHeight: 1,
                            marginTop: 3,
                            "& span": {
                                fontSize: theme.fontSize.md
                            }
                        },
                        "& > span": {
                            lineHeight: 1
                        }
                    },
                    "& .item-2": {
                        alignItems: "center",
                        "& img": {
                            width: theme.spacing(3),
                            height: theme.spacing(3),
                        }
                    },
                    "& .item-3": {
                        "& .title": {
                            width: 50,
                            textAlign: "center"
                        },
                        "& .value": {
                            lineHeight: 1,
                            width: 50,
                            textAlign: "center"
                        },
                        "& div:last-child": {
                            height: "100%",
                            justifyContent: "flex-start"
                        },
                        "& svg": {
                            marginLeft: -4
                        }
                    },
                    "& .item-4": {
                        "& .value": {
                            lineHeight: 1
                        },
                        "& div:last-child": {
                            height: "100%",
                            justifyContent: "flex-start"
                        }
                    },
                    "& .item-6": {
                        justifyContent: "center !important",
                        width: theme.spacing(12.5),
                        "& img": {
                            width: theme.spacing(18),
                            height: "100%"
                        }
                    },
                    "& .item-7": {
                        justifyContent: "center !important",
                        "& button": {
                            borderColor: theme.palette.mode === 'light' ? "#293142" : "white",
                            color: theme.palette.mode === 'light' ? "whtie" : "black",
                            borderRadius: theme.custom.ButtonBorderRadius,
                            backgroundColor: theme.palette.mode === 'light' ? "#4B8AEB" : "#66DC95",
                            boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
                            fontSize: theme.fontSize.sm,
                            textTransform: "unset",
                            "& .expand-icon": {
                                transition: "0.3s",
                                transform: "rotate(0deg)"
                            },
                            "& .activate": {
                                transform: "rotate(90deg) !important"
                            }
                        },
                        "& .mobile-expand-icon": {
                            borderRadius: 100,
                            background: "transparent",
                            boxShadow: "none",
                            color: "white"
                        }
                    },
                    "& .collapse": {
                        "& .collapse-body": {
                            marginTop: 20,
                            borderTop: "1px solid #DADADA",
                            padding: theme.spacing(2.5, 0, 0.5),
                            flexDirection: "row",
                            justifyContent: "space-between",
                            "& > div": {
                                justifyContent: "space-between",
                                width: "100%",
                                "& .description": {
                                    fontSize: theme.fontSize.md
                                },
                                "& button": {
                                    borderColor: theme.palette.mode === 'light' ? "#293142" : "white",
                                    color: theme.palette.mode === 'light' ? "#293142" : "white",
                                    borderRadius: "20px",
                                    width: "fit-content",
                                    alignSelf: "center"
                                },
                            },
                            "& .collapse-1": {
                                "& .nomics-ticker-widget-embedded": {
                                    display: "none !important"
                                },
                                "& .sub-title": {
                                    marginBottom: 4,
                                    flexDirection: "row",
                                    justifyContent: "space-between",
                                    width: theme.spacing(40),
                                },

                                "& .cal-in": {
                                    background: theme.palette.mode === 'light' ? "white" : "rgba(255, 255, 255, 0.5)",
                                    boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
                                    border: "none",
                                    height: theme.spacing(4.5),
                                    fontSize: theme.fontSize.sm,
                                    color: "black",
                                    borderRadius: 6,
                                    "& span.c-max": {
                                        color: "#027AFF",
                                        cursor: "pointer"
                                    },
                                    "& fieldset": {
                                        border: "none"
                                    }
                                },
                                "& .col-row-1": {
                                    width: theme.spacing(40),
                                    minWidth: theme.spacing(40)
                                },
                                "& .col-row-2": {
                                    width: "40%",
                                    "& button": {
                                        borderRadius: theme.custom.ButtonBorderRadius,
                                        width: "120PX",
                                        backgroundColor: "#66DC95",
                                        boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
                                        color: "black",
                                        textTransform: "unset",
                                        fontSize: theme.fontSize.sm,
                                        height: theme.spacing(4.5),
                                        paddingLeft: 0,
                                        paddingRight: 0,
                                        lineHeight: 1
                                    },
                                    "& button.return-btn": {
                                        color: "#fff",
                                        backgroundColor: theme.palette.mode === 'light' ? "rgb(255 46 46)" : "rgb(255 46 46)",
                                    },
                                    "& button.earn-btn": {
                                        backgroundColor: "#4B8AEB",
                                        color: "white",
                                        paddingLeft: 0,
                                        paddingRight: 0
                                    },
                                    "& a": {
                                        textDecoration: "none"
                                    }
                                }
                            },
                            "& .collapse-2": {
                                background: "#EBEBEB",
                                boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
                                padding: theme.spacing(2),
                                borderRadius: theme.spacing(1.25),
                                color: "black",
                                margin: theme.spacing(0, 3.75),
                                width: 190,
                                minWidth: 190,
                                '& .time-description': {
                                    fontSize: theme.spacing(1.2),
                                    lineHeight: 1
                                },
                                "& > div": {
                                    alignItems: "flex-start",
                                },
                                "& button": {
                                    width: "100%",
                                    borderRadius: theme.custom.ButtonBorderRadius,
                                    background: "white",
                                    boxShadow: 'none',
                                    textTransform: "capitalize",
                                    color: "black",
                                    fontSize: theme.fontSize.sm,
                                    height: theme.spacing(3.5)
                                },

                            },
                            "& .bg-green": {
                                background: "#66DC95",
                            },
                            "& .collapse-3": {
                                marginBottom: theme.spacing(0.5),
                                maxWidth: theme.spacing(26.25),
                                "& input": {
                                    fontSize: theme.fontSize.sm,
                                    padding: 0
                                },
                                "& .slider": {
                                    color: "#027AFF !important",
                                    padding: 0,
                                    height: 6,
                                    "& .css-eg0mwd-MuiSlider-thumb": {
                                        width: theme.spacing(1.25),
                                        height: theme.spacing(1.25),
                                    },
                                    "& .css-1ti6opd-MuiSlider-thumb": {
                                        width: `${theme.spacing(1.25)} !important`,
                                        height: `${theme.spacing(1.25)} !important`,
                                    },
                                    "& .MuiSlider-thumb": {
                                        width: `${theme.spacing(1.25)} !important`,
                                        height: `${theme.spacing(1.25)} !important`,
                                    }
                                },
                                "& .currency-control-box": {
                                    "& > div": {
                                        color: 'white',
                                        borderBottom: "1px solid rgba(255, 255, 255, 0.7)",
                                        "&:before": {
                                            border: "none"
                                        },
                                        "&:after": {
                                            border: "none"
                                        }
                                    }
                                }
                            },
                            "& .collapse-4": {
                                justifyContent: "center !important",
                                margin: theme.spacing(0, 2.5),
                                width: theme.spacing(10)
                            },
                            "& .collapse-5": {
                                marginLeft: theme.spacing(3.75),
                                alignItems: "flex-start !important",
                                justifyContent: "center",
                                width: "80%",
                                "& > div": {
                                    lineHeight: 1,
                                    "& span": {
                                        alignSelf: "flex-start",
                                    }
                                }
                            }
                        },
                        "& .collapse-body-mobile": {
                            marginTop: 20,
                            borderTop: "1px solid #DADADA",
                            padding: theme.spacing(2.5, 0, 0),
                            flexDirection: "column",
                            justifyContent: "space-between",
                            "& .collapse-1": {
                                flexDirection: "row",
                                justifyContent: "space-between",
                                "& > div": {
                                    width: "100%",
                                    maxWidth: "100%"
                                }
                            },
                            '& .time-description': {
                                fontSize: theme.spacing(1.25),
                                lineHeight: theme.isMobile ? 0.5 : 1.2
                            },
                            "& .collapse-2": {
                                width: "100%",
                                "& > div:first-child": {
                                    flexDirection: theme.isMobile ? "row" : "column",
                                    justifyContent: "space-between"
                                },
                                "& .first": {
                                    background: "white !important",
                                },
                                "& .cal-in": {
                                    background: theme.palette.mode === 'light' ? "white" : "rgba(255, 255, 255, 0.5)",
                                    boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
                                    border: "none",
                                    height: theme.spacing(6),
                                    fontSize: theme.spacing(2),
                                    color: "black",
                                    borderRadius: 6,
                                    "& span.c-max": {
                                        color: "#027AFF",
                                        cursor: "pointer"
                                    },
                                    "& fieldset": {
                                        border: "none"
                                    }
                                },
                                "& button": {
                                    borderRadius: theme.custom.ButtonBorderRadius,
                                    width: "100%",
                                    backgroundColor: "#66DC95",
                                    boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
                                    color: "black",
                                    textTransform: "unset",
                                    fontSize: 14,
                                    height: theme.spacing(6)
                                },
                            },
                            "& .collapse-3": {
                                width: "100%",
                                "& > div:first-child": {
                                    flexDirection: theme.isMobile ? "row" : "column",
                                    justifyContent: "space-between"
                                },
                                "& .first": {
                                    background: "white !important",
                                },
                                "& .cal-in": {
                                    background: theme.palette.mode === 'light' ? "white" : "rgba(255, 255, 255, 0.5)",
                                    boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
                                    border: "none",
                                    height: theme.spacing(6),
                                    fontSize: theme.spacing(2),
                                    color: "black",
                                    borderRadius: 6,
                                    "& span.c-max": {
                                        color: "#027AFF",
                                        cursor: "pointer"
                                    },
                                    "& fieldset": {
                                        border: "none"
                                    }
                                },
                                "& button": {
                                    borderRadius: theme.custom.ButtonBorderRadius,
                                    width: "100%",
                                    backgroundColor: "#66DC95",
                                    boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
                                    color: "black",
                                    textTransform: "unset",
                                    fontSize: 14,
                                    height: theme.spacing(6)
                                },
                                "& button.return-btn": {
                                    color: "#fff",
                                    backgroundColor: theme.palette.mode === 'light' ? "#4B8AEB" : "#4B8AEB",
                                }
                            },
                            "& .collapse-4": {
                                flexDirection: "row",
                                justifyContent: "space-between",
                                background: "#EBEBEB",
                                borderRadius: 10,
                                padding: theme.spacing(1.5),
                                "& span": {
                                    color: "black"
                                },
                                "& button": {
                                    backgroundColor: "white",
                                    color: "black",
                                    boxShadow: "none",
                                    width: "40%",
                                    textTransform: "unset",
                                    borderRadius: theme.spacing(1)
                                }
                            },
                            "& .bg-green": {
                                background: "#66DC95",
                            }
                        }
                    }
                },
            }
        }
    }
});

export default useStyles;