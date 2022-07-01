import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => {
    return {
        filter: {
            "& ul": {
                "& li": {
                    fontSize: theme.fontSize.md,
                    "&:hover": {
                        color: "#027AFF",
                        background: "transparent"
                    }
                }
            }
        },
        controlbar: {
            display: "flex",
            padding: `${theme.spacing(0.5, 2)}`,
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
                borderBottom: theme.palette.mode === "light" ? "0.5px solid rgba(0, 0, 0, 0.4)" : "0.5px solid rgba(255, 255, 255, 0.4)",
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
                },
                "& .search": {
                    position: 'relative',
                    borderRadius: theme.shape.borderRadius,
                    marginLeft: 0,
                    width: '100%',
                    flexDirection: "row",
                    [theme.breakpoints.up('sm')]: {
                        marginLeft: theme.spacing(1),
                        width: 'auto',
                    },
                    "& .SearchIconWrapper": {
                        height: '100%',
                        position: 'absolute',
                        pointerEvents: 'none',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    },
                    "& .search-inputbase": {
                        color: 'inherit',
                        '& .MuiInputBase-input': {
                            padding: theme.spacing(1, 1, 1, 0),
                            paddingLeft: theme.spacing(2.5),
                            transition: theme.transitions.create('width'),
                            width: '100%',
                            fontSize: theme.fontSize.md
                        },
                    }
                }
            }
        }
    }
});

export default useStyles;