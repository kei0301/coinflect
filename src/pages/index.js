import React, { useEffect, useState, useContext } from "react";

import Box from '@mui/material/Box';
import Menu from "@mui/material/Menu";
import Stack from "@mui/material/Stack";
import Switch from "@mui/material/Switch";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Skeleton from '@mui/material/Skeleton';
import useTheme from '@mui/material/styles/useTheme';
import useMediaQuery from '@mui/material/useMediaQuery';
import FormControlLabel from "@mui/material/FormControlLabel";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

import Web3 from "web3";

import useStyles from "../assets/constants/styles";
import { Vaults, Currencys, TotalPoolNum } from "../config/app";
import axios from "axios";

import Pool from "./Pool";
import { baseCurrency, CurrencySymbol, setInit, tempChart, toDec } from "../config/config";
import { ThemeModeContext } from "../context/themmode";
import { lang_texts, Filters, Languages } from "../assets/constants/language";
import ChartBox from "./chart";

const web3 = new Web3(new Web3.providers.HttpProvider("https://bsc-dataseed.binance.org/"));
let countable = 0;

const Home = () => {
    const styles = useStyles();
    const theme = useTheme();
    const mode = theme.palette.mode;
    const { currency, setCurrency, setLanguage, language } = useContext(ThemeModeContext)

    const tablet = useMediaQuery('(min-width:1200px)');
    const mobile = useMediaQuery('(min-width:800px)');

    const [cy, setCy] = React.useState(null);
    const [lg, setLG] = React.useState(null);
    const [APS, setAPS] = useState({})
    const [filter, setFilter] = React.useState(null);
    const [loading, setLoading] = useState(false)
    const [totalSpy, setTotalSpy] = useState(setInit(Vaults))
    const [expanded, setExpanded] = useState({})
    const [CoinInfo, setCoinInfo] = useState([])
    const [TimeBlog, setTimeBlog] = useState({})
    const [totalUser, setTotalUser] = useState(0)
    const [searchKey, setSearchKey] = useState("")
    const [chartInfo, setChartInfo] = useState([])
    const [userStaked, setUserStaked] = useState({})
    const [coinStatus, setCoinStatus] = useState({})
    const [totalSupply, setTotalSupply] = useState({})
    const [stakedFilter, setStakedFilter] = useState(false)
    const [currentFilter, setCurrentFilter] = React.useState("")

    const filtermenu = Boolean(filter);
    const currencymenu = Boolean(cy);
    const languagemenu = Boolean(lg);

    const _handleFilter = (event) => {
        setFilter(event.currentTarget);
    };

    const _handleCloseFilter = (e, s) => {
        if (s === true) {
            setCurrentFilter(e);
        };
        setFilter(null);
    };

    const _handleLanguage = (event) => {
        setLG(event.currentTarget);
    };

    const _handleCloseLanguage = (e, s) => {
        if (s === true) {
            setLanguage(e);
        };
        setLG(null);
    };

    const _Expand = (id) => {
        setExpanded(prev => {
            let tp = prev[id];
            for (const key in prev) {
                prev[key] = false;
            }
            prev[id] = tp === true ? false : true;
            return { ...prev }
        })
    }

    const _handleExpaned = (id, e, i) => {
        let initialTop = !mobile ? 40 : 110;
        if (!e) {
            _Expand(id)
        } else if (e.target.tagName === "svg" || e.target.tagName === "path") {
            if (e.target.parentElement.tagName === "BUTTON" || e.target.parentElement.parentElement.tagName === "BUTTON") {
                _Expand(id)
                if (!expanded[id]) {
                    window.scrollTo(0, initialTop + 105 * (i + 1));
                }
            } else {
                return;
            }
        } else {
            if (!expanded[id]) {
                window.scrollTo(0, initialTop + 105 * (i + 1));
            }
            _Expand(id)
        };
    }

    const numberWithCommas = (x) => {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    const _handleCurrency = (event) => {
        setCy(event.currentTarget);
    };

    const _handleCloseCurrency = (e, s) => {
        if (s === true) {
            setCurrency(e);
        };
        setCy(null);
    };

    const GetPoolStatus = async () => {
        let total_U = 0;

        for (let i = 0; i < Vaults.length; i++) {
            if (Vaults[i].vault) {
                const Pool = new web3.eth.Contract(Vaults[i].vault.abi, Vaults[i].vault.address);
                let t_u = await Pool.methods.userCount().call();
                total_U += Number(t_u);
            }
        }

        setTotalUser(total_U)
    }

    const updateStakedState = (id, balance, rewardB) => {
        setUserStaked(prev => {
            return { ...prev, [id]: Number(balance) > 0 ? balance : rewardB }
        })
    }

    const updateEndTime = (id, t) => {
        setTimeBlog(prev => {
            return { ...prev, [id]: t }
        })
    }

    const updateAPRs = (id, apr) => {
        setAPS(prev => {
            return { ...prev, [id]: apr }
        })
    }

    const UpdatingTotalSupply = (id, Tval, coinId, i, s, coins = []) => {
        let total_S = 0;
        if (!s) {
            countable++;
            setTotalSupply(prev => {
                return { ...prev, [id]: Tval }
            })
        }
        const coin = coins.find((item) => item.id === coinId);

        if (coin) {
            total_S = coin.price * Tval;
        } else {
            total_S = baseCurrency[Vaults[i].tokenId[0]][currency] * Tval;
        }

        setTotalSpy(prev => {
            prev[i] = total_S;
            return [...prev];
        })

        if (countable === Vaults.length - 1) {
            setLoading(true)
        }
    }

    const GetChartInfo = async () => {
        let startDate = new Date(new Date() - 86400000).toISOString();
        let endDate = new Date().toISOString();
        const endpoint = `https://api.nomics.com/v1/currencies/sparkline?key=11eb38db1f3a30c89a0764bf97c083d0d8d6749b&ids=CFLT,AER2,FCF,PFT2,LLN,FFT2,WNOW,WRAITH2,DAPES,ADREAM&start=${startDate}&end=${endDate}`;
        axios.get(endpoint).then(({ data }) => {
            setChartInfo(data);
        }).catch(() => {
            setChartInfo(tempChart);
        })
    }

    const GetCoinInfo = async () => {
        await axios.get(`https://api.nomics.com/v1/currencies/ticker?key=11eb38db1f3a30c89a0764bf97c083d0d8d6749b&ids=CFLT,AER2,FCF,PFT2,LLN,FFT2,WNOW,WRAITH2,DAPES,ADREAM&interval=1d,7d&convert=${currency}`)
            .then(({ data }) => {
                for (let i = 0; i < Vaults.length; i++) {
                    if (Object.hasOwnProperty.call(totalSupply, Vaults[i].id)) {
                        UpdatingTotalSupply(Vaults[i].id, totalSupply[Vaults[i].id], Vaults[i].chart.id[1], i, true, data)
                    }
                }
                setCoinInfo([...data])



                let CFLTINFO = data.find((item) => item.id === "CFLT");
                let priceptc = (CFLTINFO['1d'] ? CFLTINFO['1d'].price_change_pct * 100 : CFLTINFO['7d'] ? CFLTINFO['7d'].price_change_pct * 100 : 0).toFixed(2);
                let status = "";
                if (priceptc >= 1) {
                    status = 'text-green';
                    priceptc = `+${priceptc}`;
                }
                if (priceptc > 0 && priceptc < 1) {
                    status = 'text-purple';
                    priceptc = `+${priceptc}`;
                }
                if (priceptc <= -1) {
                    status = 'text-red';
                }
                if (priceptc > -1 && priceptc < 0) {
                    status = 'text-pink';
                }

                setCoinStatus({
                    price: Number(CFLTINFO.price).toFixed(6),
                    priceptc,
                    status
                })
            })
            .catch(err => {
                console.log(err);
                for (let i = 0; i < Vaults.length; i++) {
                    if (Object.hasOwnProperty.call(totalSupply, Vaults[i].id)) {
                        UpdatingTotalSupply(Vaults[i].id, totalSupply[Vaults[i].id], Vaults[i].chart.id[1], i, true)
                    }
                }
            });

    }

    useEffect(() => {
        setCoinInfo([]);
        GetCoinInfo();
    }, [currency])

    useEffect(() => {
        GetChartInfo()
        GetPoolStatus()
    }, [])

    useEffect(() => {
        setFilter(null)
        setCy(null)
        setLG(null)
    }, [tablet, mobile])

    useEffect(() => {
        if (!tablet || !mobile) {
            const script = document.createElement("script");
            script.src = "https://widget.nomics.com/embed.js";
            script.async = true;
            document.body.appendChild(script);
            let iframe = document.querySelector("iframe");
            if (iframe) {
                let url = iframe.getAttribute('src');
                iframe.setAttribute("src", `${url.substr(0, url.length - 4) + currency}/`)
            }
        }
    }, [expanded, tablet, currency])

    return (
        <Box className={styles.Home}>
            {(() => {
                if (!mobile && !tablet) {
                    return (
                        <Stack className={styles.mobileControlbar} spacing={1}>
                            <Stack className="search-filter-box">
                                <Stack>
                                    <Stack
                                        className="search"
                                    >
                                        <svg width="14" height="14" viewBox="0 0 12 12" fill="none">
                                            <path d="M4.69435 2.59624C3.19893 2.66017 2.02759 3.90946 2.02759 5.44035C2.02759 5.54863 2.03365 5.65753 2.04552 5.76408C2.06164 5.9094 2.18211 6.01669 2.32185 6.01669C2.33239 6.01669 2.34306 6.01607 2.35372 6.01483C2.50655 5.99711 2.61635 5.85613 2.5989 5.69978C2.58945 5.61454 2.58472 5.52732 2.58472 5.44048C2.58472 4.21571 3.52155 3.21643 4.71762 3.16526C4.8713 3.1587 4.9908 3.02601 4.98437 2.86892C4.97783 2.7117 4.84573 2.58955 4.69435 2.59624Z" fill={mode === "light" ? "#027AFF" : "#66DC95"} />
                                            <path d="M8.07614 2.06117C6.26838 0.21299 3.32635 0.212866 1.51835 2.06117C-0.289646 3.90934 -0.289646 6.91663 1.51835 8.76481C2.42223 9.68889 3.60971 10.151 4.79718 10.151C5.83935 10.151 6.88139 9.79494 7.73182 9.0832L10.2783 11.6862C10.3688 11.7788 10.4874 11.825 10.6061 11.825C10.7248 11.825 10.8434 11.7788 10.9341 11.6861C11.1152 11.501 11.1152 11.2008 10.9341 11.0157L8.38761 8.41271C9.87711 6.55264 9.77348 3.79611 8.07614 2.06117ZM7.42023 8.09432C5.97387 9.57256 3.62049 9.57281 2.17414 8.09432C0.727793 6.61583 0.727793 4.21015 2.17414 2.73153C2.89732 1.99241 3.84725 1.62272 4.79718 1.62272C5.74724 1.62272 6.69705 1.99241 7.42035 2.73153C8.86658 4.21015 8.86658 6.61583 7.42023 8.09432Z" fill={mode === "light" ? "#027AFF" : "#66DC95"} />
                                        </svg>
                                        <input placeholder={lang_texts[language][3]} value={searchKey} onChange={(e) => setSearchKey(e.target.value)} />
                                    </Stack>

                                    <Stack direction="row" spacing={2}>
                                        <Button
                                            id="demo-customized-button"
                                            aria-controls="demo-customized-menu"
                                            aria-haspopup="true"
                                            aria-expanded={languagemenu ? 'true' : undefined}
                                            variant="text"
                                            onClick={_handleLanguage}
                                            className="headerbar-drop-button mobile-language-button"
                                            startIcon={
                                                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M12.6973 10.1961C13.3064 9.20741 13.6281 8.06972 13.6265 6.90971L13.6265 6.9096L13.6265 6.90949C13.6281 5.74946 13.3064 4.61176 12.6973 3.62311L12.6938 3.61772C12.1287 2.70012 11.3368 1.94222 10.3938 1.41645C9.45083 0.890676 8.38826 0.614598 7.30764 0.614594C6.22701 0.614589 5.16444 0.890658 4.22146 1.41642C3.27847 1.94219 2.48658 2.70008 1.92145 3.61767L1.91794 3.62314C1.31032 4.61247 0.988774 5.74976 0.98877 6.90958C0.988765 8.0694 1.3103 9.2067 1.91792 10.196L1.92149 10.2016C2.48662 11.1192 3.27851 11.877 4.22149 12.4028C5.16447 12.9285 6.22703 13.2046 7.30764 13.2046C8.38825 13.2046 9.45081 12.9285 10.3938 12.4028C11.3368 11.877 12.1286 11.1191 12.6938 10.2015L12.6973 10.1961ZM8.11531 12.1257C7.9949 12.2415 7.85631 12.3368 7.70502 12.408C7.58085 12.4668 7.44509 12.4973 7.30761 12.4973C7.17013 12.4973 7.03438 12.4668 6.9102 12.408C6.6223 12.2615 6.37586 12.0455 6.19339 11.7796C5.82074 11.2432 5.54458 10.6462 5.37725 10.0155C6.02005 9.97609 6.66351 9.95602 7.30762 9.95528C7.95146 9.95528 8.59495 9.97536 9.23809 10.0155C9.14547 10.3398 9.02978 10.6571 8.8919 10.965C8.71034 11.3981 8.44666 11.7922 8.11531 12.1257V12.1257ZM1.71111 7.26325H4.2598C4.2764 7.97175 4.35348 8.67755 4.49023 9.37302C3.79351 9.4341 3.09858 9.51799 2.40542 9.62468C1.99952 8.89922 1.76225 8.09224 1.71111 7.26325V7.26325ZM2.40542 4.19451C3.0983 4.30148 3.79348 4.38538 4.49096 4.44623C4.35394 5.14165 4.27669 5.84745 4.26003 6.55595H1.71111C1.76225 5.72696 1.99952 4.91998 2.40542 4.19451H2.40542ZM6.49992 1.69347C6.62032 1.57772 6.75891 1.48236 6.9102 1.41116C7.03438 1.35239 7.17013 1.32189 7.30761 1.32189C7.44509 1.32189 7.58085 1.35239 7.70502 1.41116C7.99292 1.55767 8.23937 1.77372 8.42184 2.03958C8.79448 2.57603 9.07064 3.17296 9.23797 3.80369C8.59516 3.84309 7.95171 3.86317 7.30762 3.86391C6.66378 3.8639 6.02028 3.84382 5.37713 3.80368C5.46976 3.47939 5.58545 3.16208 5.72333 2.85417C5.90488 2.42113 6.16856 2.02703 6.49992 1.69347V1.69347ZM12.9041 6.55595H10.3554C10.3388 5.84745 10.2617 5.14164 10.125 4.44617C10.8217 4.38509 11.5167 4.3012 12.2098 4.19451C12.6157 4.91998 12.853 5.72696 12.9041 6.55595ZM5.2043 9.31803C5.06546 8.64134 4.98704 7.95373 4.96997 7.26325H9.64534C9.62842 7.95372 9.55015 8.64135 9.41143 9.31806C8.71092 9.27226 8.00965 9.2489 7.30762 9.24799C6.60609 9.24798 5.90498 9.27133 5.2043 9.31803ZM9.41092 4.50115C9.54976 5.17785 9.62818 5.86547 9.64525 6.55595H4.96989C4.9868 5.86547 5.06508 5.17784 5.2038 4.50112C5.9043 4.54691 6.60557 4.57027 7.30762 4.57121C8.00915 4.57121 8.71025 4.54786 9.41092 4.50116V4.50115ZM10.3552 7.26325H12.9041C12.853 8.09224 12.6157 8.89922 12.2098 9.62468C11.5169 9.5177 10.8217 9.4338 10.1243 9.37296C10.2613 8.67754 10.3385 7.97175 10.3552 7.26325ZM11.7841 3.54351C11.1783 3.63058 10.5707 3.69952 9.96126 3.75032C9.85173 3.34406 9.71046 2.94696 9.53876 2.56264C9.38199 2.20899 9.18474 1.87456 8.95092 1.56601C10.0809 1.91125 11.0725 2.60336 11.7841 3.54351ZM3.34153 2.95848C3.98974 2.31211 4.7872 1.83401 5.66401 1.5661C5.65071 1.58326 5.63703 1.59966 5.62391 1.61718C5.17323 2.26351 4.84495 2.98648 4.65526 3.75043C4.0458 3.69901 3.43775 3.63003 2.83111 3.54351C2.98757 3.33705 3.15811 3.14158 3.34153 2.95848V2.95848ZM2.83111 10.2757C3.43691 10.1886 4.04453 10.1197 4.65396 10.0689C4.76349 10.4751 4.90476 10.8722 5.07647 11.2565C5.23323 11.6102 5.43049 11.9446 5.66431 12.2532C4.53432 11.9079 3.54272 11.2158 2.83111 10.2757V10.2757ZM11.2737 10.8607C10.6255 11.5071 9.82803 11.9852 8.95121 12.2531C8.96452 12.2359 8.97819 12.2195 8.99131 12.202C9.442 11.5557 9.77028 10.8327 9.95997 10.0688C10.5694 10.1202 11.1775 10.1892 11.7841 10.2757C11.6277 10.4821 11.4571 10.6776 11.2737 10.8607V10.8607Z" fill={mode === "light" ? "#027AFF" : "#66DC95"} stroke={mode === "light" ? "#027AFF" : "#66DC95"} strokeWidth="0.35" />
                                                </svg>
                                            }
                                            endIcon={<KeyboardArrowDownIcon fontSize="small" />}
                                        >
                                        </Button>
                                        <Menu
                                            elevation={0}
                                            anchorOrigin={{
                                                vertical: 'bottom',
                                                horizontal: 'right',
                                            }}
                                            transformOrigin={{
                                                vertical: 'top',
                                                horizontal: 'right',
                                            }}
                                            className={styles.languagemenu}
                                            id="demo-customized-menu"
                                            MenuListProps={{
                                                'aria-labelledby': 'demo-customized-button',
                                            }}
                                            anchorEl={lg}
                                            open={languagemenu}
                                            onClose={_handleCloseLanguage}
                                        >
                                            {
                                                Object.keys(Languages).map((key, i) => (
                                                    <MenuItem key={i} onClick={() => _handleCloseLanguage(key, true)} disableRipple>
                                                        {Languages[key]}
                                                    </MenuItem>
                                                ))
                                            }
                                        </Menu>
                                        <Button
                                            id="demo-customized-button"
                                            aria-controls="demo-customized-menu"
                                            aria-haspopup="true"
                                            aria-expanded={currencymenu ? 'true' : undefined}
                                            variant="text"
                                            onClick={_handleCurrency}
                                            startIcon={
                                                <svg width="16" height="14" viewBox="0 0 17 14" fill="none">
                                                    <path d="M6.12772 0.479248C4.78797 0.479248 3.57115 0.734134 2.67806 1.16062C1.81061 1.57455 1.22178 2.16693 1.18927 2.86747C1.18927 2.87386 1.18286 2.87386 1.18286 2.88025V2.88664C1.17645 2.89941 1.17645 2.91858 1.17645 2.93752V4.90565C1.17645 4.91842 1.17645 4.92481 1.17645 4.93759V7.03305C1.17645 7.03944 1.17645 7.05221 1.17645 7.05838V8.98816C1.17645 9.71449 1.77833 10.3256 2.67165 10.7589C3.57138 11.1856 4.78819 11.4403 6.12794 11.4403C6.63298 11.4403 7.11833 11.4019 7.57782 11.3319C8.4194 12.3891 9.72023 13.0643 11.1767 13.0643C13.7205 13.0643 15.7853 11.0008 15.7853 8.46607C15.7853 5.92474 13.7205 3.86123 11.1767 3.86123H11.0668V2.93752C11.0733 2.91858 11.0668 2.89941 11.0668 2.88664C11.0668 2.88025 11.0668 2.88025 11.0668 2.87386C11.0604 2.87386 11.0604 2.86747 11.0604 2.86108C11.0217 2.1667 10.4327 1.57432 9.57187 1.16039C8.67146 0.734135 7.46747 0.479248 6.12772 0.479248ZM6.12772 0.842296C7.41596 0.842296 8.58103 1.09718 9.40956 1.49218C10.2186 1.88055 10.6845 2.39033 10.704 2.90603C10.704 2.91219 10.704 2.91881 10.704 2.92497C10.704 2.93136 10.704 2.93136 10.704 2.93775C10.704 3.30719 10.4709 3.68301 10.0373 4.00773C10.0373 4.01411 10.0309 4.00773 10.0309 4.00773C9.47412 4.15422 8.9629 4.3961 8.50983 4.71465C7.81065 4.91204 7.00158 5.0332 6.12772 5.0332C4.83329 5.0332 3.66181 4.78471 2.83306 4.38332C2.05627 4.01411 1.59701 3.5299 1.54504 3.03952V2.93752C1.54504 2.91858 1.53863 2.9058 1.53863 2.89302C1.5645 2.38371 2.02421 1.88032 2.83306 1.49195C3.66159 1.09718 4.83307 0.842296 6.12772 0.842296ZM10.704 3.86739V3.88656H10.6845C10.6909 3.88017 10.6976 3.87401 10.704 3.86739ZM1.54504 3.87401C1.80397 4.19872 2.19866 4.48555 2.67783 4.71465C3.57093 5.14136 4.78797 5.39625 6.12749 5.39625C6.74906 5.39625 7.3443 5.34514 7.89467 5.23698C7.40932 5.73374 7.03386 6.33251 6.81362 7.0011C6.5872 7.02027 6.35414 7.03305 6.12131 7.03305C4.82666 7.03305 3.66159 6.78455 2.83306 6.38339C2.00475 5.98863 1.54504 5.46608 1.54504 4.93759C1.54504 4.9312 1.54504 4.92481 1.54504 4.91842V3.87401ZM11.1763 4.22428C13.5261 4.22428 15.4224 6.12212 15.4224 8.46607C15.4224 10.8098 13.5261 12.7076 11.1763 12.7076C8.83332 12.7076 6.93656 10.8098 6.93656 8.46607C6.93679 6.12212 8.83332 4.22428 11.1763 4.22428ZM1.54504 5.88024C1.80397 6.20495 2.19866 6.48517 2.67142 6.7145C3.56452 7.14121 4.78155 7.38971 6.12131 7.38971C6.32186 7.38971 6.50959 7.38332 6.70373 7.37054C6.61971 7.72081 6.57438 8.09001 6.57438 8.46607C6.57438 8.6954 6.58743 8.92473 6.61971 9.14105C6.45785 9.15383 6.28958 9.16022 6.12131 9.16022C4.82666 9.16022 3.66159 8.90556 2.83306 8.51057C2.00475 8.1158 1.54504 7.58709 1.54504 7.05838C1.54504 7.05221 1.54504 7.0456 1.54504 7.0456V5.88024ZM1.54504 8.00102C1.80397 8.32596 2.19866 8.60618 2.67142 8.83528C3.56452 9.26199 4.78155 9.51688 6.12131 9.51688C6.31545 9.51688 6.49677 9.51688 6.68427 9.50387C6.81362 10.0454 7.03386 10.5547 7.33789 11.0008C6.94961 11.0517 6.54828 11.0834 6.12749 11.0834C4.83307 11.0834 3.66159 10.8351 2.83283 10.4337C2.00452 10.039 1.54482 9.51665 1.54482 8.98794L1.54504 8.00102Z" fill={mode === "light" ? "#027AFF" : "#66DC95"} stroke={mode === "light" ? "#027AFF" : "#66DC95"} strokeWidth="0.8" />
                                                </svg>
                                            }
                                            endIcon={<KeyboardArrowDownIcon fontSize="small" />}
                                            className="headerbar-drop-button"
                                        >
                                            {currency}
                                        </Button>
                                        <Menu
                                            elevation={0}
                                            anchorOrigin={{
                                                vertical: 'bottom',
                                                horizontal: 'right',
                                            }}
                                            transformOrigin={{
                                                vertical: 'top',
                                                horizontal: 'right',
                                            }}
                                            id="demo-customized-menu"
                                            MenuListProps={{
                                                'aria-labelledby': 'demo-customized-button',
                                            }}
                                            className={styles.currencymenu}
                                            anchorEl={cy}
                                            open={currencymenu}
                                            onClose={_handleCloseCurrency}
                                        >
                                            {
                                                Currencys.map((item, key) => (
                                                    <MenuItem key={key} onClick={() => _handleCloseCurrency(item, true)} disableRipple>
                                                        {item}
                                                    </MenuItem>
                                                ))
                                            }
                                        </Menu>
                                        <Button
                                            variant="text"
                                            endIcon={
                                                <svg width="15" height="15" viewBox="0 0 12 12" fill="none">
                                                    <path d="M7.10487 5.45501L10.5493 1.28616H1.66624L5.14696 5.45501C5.21948 5.56283 5.25573 5.67064 5.25573 5.77846V9.51605L6.95984 10.3426V5.74252C6.95984 5.6347 7.03236 5.52689 7.10487 5.45501ZM11.8909 1.1424L7.90254 5.92221V11.0614C7.90254 11.4208 7.53996 11.6364 7.2499 11.4927L4.6031 10.2348C4.45807 10.1629 4.31304 10.0192 4.31304 9.80356V5.92221L0.324705 1.1424C0.0709019 0.854895 0.288447 0.387695 0.687281 0.387695H11.5283C11.9271 0.387695 12.1447 0.818956 11.8909 1.1424Z" fill={mode === "light" ? "#027AFF" : "#66DC95"} />
                                                </svg>
                                            }
                                            id="demo-customized-button"
                                            aria-controls="demo-customized-menu"
                                            aria-haspopup="true"
                                            aria-expanded={filtermenu ? 'true' : undefined}
                                            onClick={_handleFilter}
                                        >
                                            {lang_texts[language][4]}
                                        </Button>
                                        <Menu
                                            elevation={0}
                                            anchorOrigin={{
                                                vertical: 'bottom',
                                                horizontal: 'right',
                                            }}
                                            transformOrigin={{
                                                vertical: 'top',
                                                horizontal: 'right',
                                            }}
                                            id="demo-customized-menu"
                                            MenuListProps={{
                                                'aria-labelledby': 'demo-customized-button',
                                            }}
                                            className={styles.filter}
                                            anchorEl={filter}
                                            open={filtermenu}
                                            onClose={_handleCloseFilter}
                                        >
                                            {
                                                Filters[language].map((item, key) => (
                                                    <MenuItem key={key} onClick={() => _handleCloseFilter(item.id, true)} disableRipple>
                                                        {item.text}
                                                    </MenuItem>
                                                ))
                                            }
                                        </Menu>
                                    </Stack>
                                </Stack>
                            </Stack>
                            <Stack className="active-btn-box">
                                <FormControlLabel
                                    control={
                                        <Switch
                                            className="styled-switch"
                                            focusVisibleClassName=".Mui-focusVisible"
                                            disableRipple sx={{ m: 1 }}
                                            defaultChecked={false}
                                            onChange={() => setStakedFilter(!stakedFilter)}
                                        />
                                    }
                                    label={lang_texts[language][2]}
                                />
                            </Stack>
                        </Stack>
                    )
                } else {
                    return (
                        <Stack className={styles.laptopControlBar}>
                            <Stack className="active-btn-box">
                                <FormControlLabel
                                    control={
                                        <Switch
                                            className="styled-switch"
                                            focusVisibleClassName=".Mui-focusVisible"
                                            disableRipple sx={{ m: 1 }}
                                            defaultChecked={false}
                                            onChange={() => setStakedFilter(!stakedFilter)}
                                        />
                                    }
                                    label={lang_texts[language][2]}
                                />
                            </Stack>
                            <Stack className="search-filter-box">
                                <Stack>
                                    <Stack
                                        className="search"
                                    >
                                        <svg width="14" height="14" viewBox="0 0 12 12" fill="none">
                                            <path d="M4.69435 2.59624C3.19893 2.66017 2.02759 3.90946 2.02759 5.44035C2.02759 5.54863 2.03365 5.65753 2.04552 5.76408C2.06164 5.9094 2.18211 6.01669 2.32185 6.01669C2.33239 6.01669 2.34306 6.01607 2.35372 6.01483C2.50655 5.99711 2.61635 5.85613 2.5989 5.69978C2.58945 5.61454 2.58472 5.52732 2.58472 5.44048C2.58472 4.21571 3.52155 3.21643 4.71762 3.16526C4.8713 3.1587 4.9908 3.02601 4.98437 2.86892C4.97783 2.7117 4.84573 2.58955 4.69435 2.59624Z" fill={mode === "light" ? "#027AFF" : "#66DC95"} />
                                            <path d="M8.07614 2.06117C6.26838 0.21299 3.32635 0.212866 1.51835 2.06117C-0.289646 3.90934 -0.289646 6.91663 1.51835 8.76481C2.42223 9.68889 3.60971 10.151 4.79718 10.151C5.83935 10.151 6.88139 9.79494 7.73182 9.0832L10.2783 11.6862C10.3688 11.7788 10.4874 11.825 10.6061 11.825C10.7248 11.825 10.8434 11.7788 10.9341 11.6861C11.1152 11.501 11.1152 11.2008 10.9341 11.0157L8.38761 8.41271C9.87711 6.55264 9.77348 3.79611 8.07614 2.06117ZM7.42023 8.09432C5.97387 9.57256 3.62049 9.57281 2.17414 8.09432C0.727793 6.61583 0.727793 4.21015 2.17414 2.73153C2.89732 1.99241 3.84725 1.62272 4.79718 1.62272C5.74724 1.62272 6.69705 1.99241 7.42035 2.73153C8.86658 4.21015 8.86658 6.61583 7.42023 8.09432Z" fill={mode === "light" ? "#027AFF" : "#66DC95"} />
                                        </svg>
                                        <input placeholder={lang_texts[language][3]} value={searchKey} onChange={(e) => setSearchKey(e.target.value)} />
                                    </Stack>
                                    <Button
                                        variant="text"
                                        endIcon={
                                            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                                                <path d="M7.10487 5.45501L10.5493 1.28616H1.66624L5.14696 5.45501C5.21948 5.56283 5.25573 5.67064 5.25573 5.77846V9.51605L6.95984 10.3426V5.74252C6.95984 5.6347 7.03236 5.52689 7.10487 5.45501ZM11.8909 1.1424L7.90254 5.92221V11.0614C7.90254 11.4208 7.53996 11.6364 7.2499 11.4927L4.6031 10.2348C4.45807 10.1629 4.31304 10.0192 4.31304 9.80356V5.92221L0.324705 1.1424C0.0709019 0.854895 0.288447 0.387695 0.687281 0.387695H11.5283C11.9271 0.387695 12.1447 0.818956 11.8909 1.1424Z" fill={mode === "light" ? "#027AFF" : "#66DC95"} />
                                            </svg>
                                        }
                                        id="demo-customized-button"
                                        aria-controls="demo-customized-menu"
                                        aria-haspopup="true"
                                        aria-expanded={filtermenu ? 'true' : undefined}
                                        onClick={_handleFilter}
                                    >
                                        {lang_texts[language][4]}
                                    </Button>
                                    <Menu
                                        elevation={0}
                                        anchorOrigin={{
                                            vertical: 'bottom',
                                            horizontal: 'right',
                                        }}
                                        transformOrigin={{
                                            vertical: 'top',
                                            horizontal: 'right',
                                        }}
                                        id="demo-customized-menu"
                                        MenuListProps={{
                                            'aria-labelledby': 'demo-customized-button',
                                        }}
                                        className={styles.filter}
                                        anchorEl={filter}
                                        open={filtermenu}
                                        onClose={_handleCloseFilter}
                                    >
                                        {
                                            Filters[language].map((item, key) => (
                                                <MenuItem key={key} onClick={() => _handleCloseFilter(item.id, true)} disableRipple>
                                                    {item.text}
                                                </MenuItem>
                                            ))
                                        }
                                    </Menu>
                                </Stack>
                            </Stack>
                        </Stack>
                    )
                }
            })()}
            {(() => {
                if (mobile && tablet) {
                    return (
                        <Stack className="state-bar" direction="row" spacing={4}>
                            <Stack spacing={2} className="token-state">
                                <Typography variant="h6">
                                    Coinflect (CFLT)
                                </Typography>
                                <Stack direction="row">
                                    <Stack>
                                        <Typography variant="h5">
                                            {CurrencySymbol[currency]} {coinStatus.price ? coinStatus.price : toDec(baseCurrency.CFLT.USD, 0, 6)}
                                        </Typography>
                                        <Typography variant="span" className={
                                            coinStatus.status ? `state-percent ${coinStatus.status}` : 'state-percent'
                                        }>
                                            {coinStatus.priceptc ? coinStatus.priceptc : '0.00'}%
                                        </Typography>
                                    </Stack>
                                    <ChartBox AllData={chartInfo} id="CFLT" type="status" coin={coinStatus} />
                                </Stack>
                            </Stack>
                            <Stack spacing={2}>
                                <Typography variant="h6">
                                    {lang_texts[language][5]}
                                </Typography>
                                <Stack>
                                    <Typography variant="h5">
                                        {TotalPoolNum}
                                    </Typography>
                                </Stack>
                            </Stack>
                            <Stack spacing={2}>
                                <Typography variant="h6">
                                    {lang_texts[language][6]}
                                </Typography>
                                {
                                    loading ?
                                        <Stack>
                                            <Typography variant="h5">
                                                {CurrencySymbol[currency]} {numberWithCommas(toDec(totalSpy.reduce((a, b) => a + b, 0), 0, 2))}
                                            </Typography>
                                        </Stack>
                                        :
                                        <Skeleton height={32} animation="wave" />
                                }
                            </Stack>
                            <Stack spacing={2}>
                                <Typography variant="h6">
                                    {lang_texts[language][7]}
                                </Typography>
                                {
                                    loading ?
                                        <Stack>
                                            <Typography variant="h5">
                                                {totalUser}
                                            </Typography>
                                        </Stack>
                                        :
                                        <Skeleton height={32} animation="wave" />
                                }
                            </Stack>
                        </Stack>
                    )
                } else if (!mobile && !tablet) {
                    return (
                        <></>
                    )
                } else {
                    return (
                        <Stack className="state-bar" direction="row" spacing={4}>
                            <Stack spacing={2} className="token-state">
                                <Typography variant="h6">
                                    Coinflect (CFLT)
                                </Typography>
                                <Stack direction="row">
                                    <Stack>
                                        <Typography variant="h5">
                                            {CurrencySymbol[currency]} {coinStatus ? coinStatus.price : toDec(baseCurrency.CFLT.USD, 0, 6)}
                                        </Typography>
                                        <Typography variant="span" className={
                                            coinStatus ? `state-percent ${coinStatus.status}` : 'state-percent'
                                        }>
                                            {coinStatus ? coinStatus.priceptc : '0.00'}%
                                        </Typography>
                                    </Stack>
                                    <ChartBox AllData={chartInfo} id="CFLT" type="status" coin={coinStatus} />
                                </Stack>
                            </Stack>
                            <Stack spacing={2}>
                                <Typography variant="h6">
                                    {lang_texts[language][5]}
                                </Typography>
                                <Stack>
                                    <Typography variant="h5">
                                        {TotalPoolNum}
                                    </Typography>
                                </Stack>
                            </Stack>
                            <Stack spacing={2}>
                                <Typography variant="h6">
                                    {lang_texts[language][6]}
                                </Typography>
                                {
                                    loading ?
                                        <Stack>
                                            <Typography variant="h5">
                                                {CurrencySymbol[currency]} {numberWithCommas(toDec(totalSpy.reduce((a, b) => a + b, 0), 0, 2))}
                                            </Typography>
                                        </Stack>
                                        :
                                        <Skeleton height={32} animation="wave" />
                                }
                            </Stack>
                            <Stack spacing={2}>
                                <Typography variant="h6">
                                    {lang_texts[language][7]}
                                </Typography>
                                {
                                    loading ?
                                        <Stack>
                                            <Typography variant="h5">
                                                {totalUser}
                                            </Typography>
                                        </Stack>
                                        :
                                        <Skeleton height={32} animation="wave" />
                                }
                            </Stack>
                        </Stack>
                    )
                }
            })()}

            <Container className="vault-lists">
                {
                    Vaults.map((item, key) => {
                        let dp = stakedFilter ? (Number(userStaked[item.id]) > 0) ? "flex" : "none" : "flex";
                        if (searchKey !== "" && item.search.toLowerCase().search(searchKey.toLowerCase()) === -1) {
                            dp = "none";
                        }
                        let order = {
                            order: key
                        }
                        if (currentFilter && currentFilter != '') {
                            switch (currentFilter) {
                                case 'aprl':
                                    order.order = APS[item.id];
                                    break;
                                case 'aprh':
                                    order.order = APS[item.id] * -1;
                                    break;
                                case 'timelowhigh':
                                    order.order = TimeBlog[item.id];
                                    break;
                                case 'timehighlow':
                                    order.order = TimeBlog[item.id] * -1;
                                    break;
                                case 'stakedlowhigh':
                                    order.order = totalSupply[item.id];
                                    break;
                                case 'stakedhighlow':
                                    order.order = totalSupply[item.id] * -1;
                                    break;
                                default:
                                    order.order = key;
                                    break;
                            }
                        }
                        return <Stack direction="row" key={key} display={dp} style={order}>
                            <Pool item={item} index={key} handleExpand={_handleExpaned} loading={loading} _web3={web3} updateTime={updateEndTime} updateStaked={updateStakedState} expand={expanded} CoinInfo={CoinInfo} UpdatingTVL={UpdatingTotalSupply} updateAPRs={updateAPRs} chartInfo={chartInfo} />
                        </Stack>
                    })
                }
            </Container>
        </Box >
    )
}

export default Home;