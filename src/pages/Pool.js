import React, { useCallback, useContext, useEffect, useState } from "react";
import BigNumber from 'bignumber.js'
import Box from '@mui/material/Box';
import Input from "@mui/material/Input";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Slider from "@mui/material/Slider";
import styled from '@mui/material/styles/styled';
import Skeleton from '@mui/material/Skeleton';
import Collapse from '@mui/material/Collapse';
import useTheme from '@mui/material/styles/useTheme';
import IconButton from '@mui/material/IconButton';
import Typography from "@mui/material/Typography";
import LoadingButton from '@mui/lab/LoadingButton';
import useMediaQuery from '@mui/material/useMediaQuery';
import OutlinedInput from '@mui/material/OutlinedInput';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import Web3 from "web3";
import { useWeb3React } from "@web3-react/core";

import { Link } from "@mui/material";
import { ThemeModeContext } from "../context/themmode";
import { netId, Tokens } from "../config/app";
import { baseCurrency, CurrencySymbol, customToFixed, numberWithCommas, secsForYear, secsPerDay, toDec } from "../config/config";
import { lang_texts } from "../assets/constants/language";
import LeftTime from './leftTime';
import ClaimTime from "./claimTime";
import ChartBox from "./chart";

const Pool = ({ item, handleExpand, expand, CoinInfo, index, UpdatingTVL, updateAPRs, updateTime, updateStaked, _web3, loading, chartInfo }) => {
    const theme = useTheme();
    const mode = theme.palette.mode;
    const Coin = CoinInfo.find((co) => co.id === item.chart.id[0]);
    const BaseCoin = CoinInfo.find((co) => co.id === item.chart.id[1]);
    const { currency, language } = useContext(ThemeModeContext)
    const { account, chainId, library } = useWeb3React();

    const tablet = useMediaQuery('(min-width:1200px)');
    const mobile = useMediaQuery('(min-width:800px)');

    const [dv, setDV] = useState()
    const [wv, setWV] = useState()
    const [sb, setSB] = useState(0)
    const [cb, setCB] = useState(0)
    const [CR, setCR] = useState(0)
    const [DR, setDR] = useState(0)
    const [APR, setAPR] = useState(0)
    const [slider, setSlider] = useState(0)
    const [balance, setBalance] = useState({})
    const [timeblog, setTimeblog] = useState()
    const [dloading, setDloading] = useState(false)
    const [wloading, setWloading] = useState(false)
    const [claimedAt, setClaimedAt] = useState(0)
    const [poolState, setPoolState] = useState(true)
    const [totalSupply, setTotalSupply] = useState()
    const [rewardCycle, setRewardCycle] = useState(0)
    const [tokenTotalS, settokenTotalS] = useState(0)
    const [tokenDecimals, setTokenDecimals] = useState({})

    const BootstrapTooltip = styled(({ className, ...props }) => (
        <Tooltip enterTouchDelay={30} leaveTouchDelay={5000} {...props} arrow classes={{ popper: className }} />
    ))(() => ({
        [`& .${tooltipClasses.arrow}`]: {
            color: mode === "light" ? "#181722" : "white",
            fontSize: 25
        },
        [`& .${tooltipClasses.tooltip}`]: {
            backgroundColor: mode === "light" ? "#181722" : "white",
            color: mode === "light" ? "white" : "black",
            fontSize: 12,
            maxWidth: 250,
            padding: 12,
            borderRadius: 6
        },
    }));

    const toBN = useCallback((web3, val) => {
        if (val) {
            val = val.toString();
            return new web3.utils.BN(val);
        } else {
            return "0"
        }
    }, []);

    const toWei = useCallback((web3, val) => {
        if (val) {
            val = val.toString();
            return web3.utils.toWei(val);
        } else {
            return "0"
        }
    }, []);


    const UpdateAllInfo = async (state) => {
        const Pool = new _web3.eth.Contract(item.vault.abi, item.vault.address);
        const CT_base = new _web3.eth.Contract(Tokens.abi[item.tokenId[0]], Tokens.address[item.tokenId[0]]);
        const CT_vault = new _web3.eth.Contract(Tokens.abi[item.tokenId[1]], Tokens.address[item.tokenId[1]]);
        const BaseDecimal = await CT_base.methods.decimals().call();
        const RewardDecimal = await CT_vault.methods.decimals().call();
        const TokenTotalSupply = await CT_base.methods.totalSupply().call();
        let t_s = await Pool.methods.totalSupply().call();
        let rewardRate = await Pool.methods.rewardRate().call();
        rewardRate = rewardRate * 10 ** (18 - RewardDecimal);
        t_s = String(toBN(_web3, t_s).mul(toBN(_web3, 10 ** (18 - BaseDecimal))));
        setTotalSupply(toDec(t_s, 18, 0))

        if (state) {
            const base_balance = await CT_base.methods.balanceOf(account).call();
            const Reward_Balance = await CT_vault.methods.balanceOf(account).call();
            const stakedToken = await Pool.methods.userInfo(account).call();
            const rewarded = await Pool.methods.claimable(account).call();
            const userInfo = await Pool.methods.userInfo(account).call();
            const rewardC = await Pool.methods.rewardCycle().call();

            const Endtime = await Pool.methods.endTime().call();
            Promise.resolve(Endtime).then(res => {
                const poolLifeCycle = res ? toDec(Math.abs(res - new Date() / 1000), 0, 0) : 0;
                const c_r = Number(t_s) > 0 ? poolLifeCycle * rewardRate / t_s : 0;
                const d_r = Number(t_s) > 0 ? secsPerDay * rewardRate / t_s : 0;
                setCR(toDec(c_r, 0, 8))
                setDR(toDec(d_r, 0, 8))
            })

            let OB = {};
            OB[item.tokenId[0]] = base_balance.toString();
            OB[item.tokenId[1]] = Reward_Balance.toString();
            setBalance(OB)
            setSB(stakedToken.amount)
            setCB(toDec(rewarded, RewardDecimal, 2))
            updateStaked(item.id, toDec(stakedToken.amount, BaseDecimal, 2), toDec(rewarded, RewardDecimal, 2))
            setClaimedAt(userInfo.claimedAt);
            setRewardCycle(rewardC)
            settokenTotalS(toDec(TokenTotalSupply, BaseDecimal, 0))
        } else {
            const Endtime = await Pool.methods.endTime().call();
            Promise.resolve(Endtime).then(res => {
                if ((Number(res) - new Date() / 1000) < 0) {
                    setPoolState(false);
                }
                setTimeblog(res);
                updateTime(item.id, res);
            })
            if (Coin && BaseCoin) {
                const APR = Coin.price / BaseCoin.price * secsForYear * rewardRate / (t_s > 0 ? t_s : 10 ** BaseDecimal) * 100;
                setAPR(toDec(APR, 0, 0))
                updateAPRs(item.id, toDec(APR, 0, 0))
            } else {
                const APR = baseCurrency[item.tokenId[1]]['USD'] / baseCurrency[item.tokenId[0]]['USD'] * secsForYear * rewardRate / (t_s > 0 ? t_s : 10 ** BaseDecimal) * 100;
                setAPR(APR < 10 ? toDec(APR, 0, 1) : toDec(APR, 0, 0))
                updateAPRs(item.id, APR < 10 ? toDec(APR, 0, 1) : toDec(APR, 0, 0))
            }
            UpdatingTVL(item.id, toDec(t_s, 18, 0), item.chart.id[1], index)
            setTokenDecimals({ BaseDecimal, RewardDecimal })
        }
    }

    const setMax = () => {
        if (Number(balance[item.tokenId[0]]) > 0) {
            setDV(new BigNumber(balance[item.tokenId[0]]).div(new BigNumber(10).pow(tokenDecimals.BaseDecimal)))
        }
    }

    const setWmax = () => {
        if (Number(sb) > 0) {
            setWV(new BigNumber(sb).div(new BigNumber(10).pow(tokenDecimals.BaseDecimal)))
        }
    }

    const deposit = async () => {
        setDloading(true)
        const WB = balance[item.tokenId[0]];
        if (Number(dv) > 0 && new BigNumber(dv).times(new BigNumber(10).pow(tokenDecimals.BaseDecimal)) <= new BigNumber(WB) && item.vault) {
            const web3 = new Web3(library.provider);
            const Pool = new web3.eth.Contract(item.vault.abi, item.vault.address);
            const TokenContract = new web3.eth.Contract(Tokens.abi[item.tokenId[0]], Tokens.address[item.tokenId[0]]);
            try {
                const allowance = await TokenContract.methods.allowance(account, item.vault.address).call({ from: account });
                if (toBN(web3, allowance).lt(toBN(web3, String(toBN(web3, dv).mul(toBN(web3, 10 ** tokenDecimals.BaseDecimal)))))) {
                    await TokenContract.methods.approve(item.vault.address, toWei(web3, "10000000000000")).send({ from: account });
                }
                await Pool.methods.deposit(String(toBN(web3, toWei(web3, dv)).mul(toBN(web3, 10 ** tokenDecimals.BaseDecimal)).div(toBN(web3, 10 ** 18)))).send({ from: account })
                UpdateAllInfo();
                setDV(0);
                setDloading(false)
            } catch (error) {
                console.log(error)
                setDloading(false)
            }
        } else {
            setDloading(false)
        }
    }

    const withdraw = async () => {
        setWloading(true)
        if (Number(wv) > 0 && new BigNumber(wv).times(new BigNumber(10).pow(tokenDecimals.BaseDecimal)) <= new BigNumber(sb) && item.vault) {
            const web3 = new Web3(library.provider);
            const Pool = new web3.eth.Contract(item.vault.abi, item.vault.address);
            try {
                await Pool.methods.withdraw(String(toBN(web3, toWei(web3, wv)).mul(toBN(web3, 10 ** tokenDecimals.BaseDecimal)).div(toBN(web3, 10 ** 18)))).send({ from: account })
                UpdateAllInfo()
                setWV();
                setWloading(false)
            } catch (error) {
                setWloading(false)
            }
        } else {
            setWloading(false)
        }
    }

    const claim = async () => {
        if (Number(cb) > 0) {
            try {
                const web3 = new Web3(library.provider);
                const Pool = new web3.eth.Contract(item.vault.abi, item.vault.address);
                await Pool.methods.claim().send({ from: account });
                await UpdateAllInfo(true);
            } catch {
                await UpdateAllInfo(true);
            }
        }
    }

    const UnsetAllData = () => {
        setDV()
        setWV()
        setSB(0)
        setCB(0)
        setCR(0)
        setDR(0)
        setSlider(0)
        setBalance({})
        setClaimedAt(0)
        settokenTotalS(0)
    }

    useEffect(() => {
        let timer;
        if (chainId === netId && library && chainId) {
            UpdateAllInfo(true)
            clearInterval(timer)
            timer = setInterval(() => {
                UpdateAllInfo(true);
            }, 20000);
            console.clear()
        } else {
            clearInterval(timer)
            timer = setInterval(() => {
                UpdateAllInfo(false);
            }, 60000);
            UnsetAllData()
            console.clear()
        }
        return () => {
            clearInterval(timer)
            console.clear()
        }
    }, [account, library, chainId])

    useEffect(() => {

        UpdateAllInfo(false);

    }, [])

    return (
        <>
            {(() => {
                if (mobile && tablet) {
                    return (
                        <Box>
                            <Stack className="item-box">
                                <Stack className="item-1">
                                    <Typography variant="span" className="value">
                                        {lang_texts[language][8]}{' '}{item.tokenId[1]}
                                    </Typography>
                                    <Stack spacing={1} direction="row">
                                        <Typography variant="span" className="sub-description">
                                            {lang_texts[language][9]}{' '}{item.tokenId[0]}
                                        </Typography>
                                    </Stack>
                                </Stack>
                                <Stack justifyContent="center" className="item-3" spacing={0.75}>
                                    <Stack className="help" direction="row">
                                        <Typography variant="span" className="title">
                                            APR
                                        </Typography>
                                        <BootstrapTooltip title={lang_texts[language][28]} placement="top">
                                            <svg width="14" height="14" viewBox="0 0 10 10" fill="none">
                                                <path d="M4.79254 9.99999C2.14318 9.99999 -0.00012207 7.88843 -0.00012207 5.30008C-0.00012207 2.71173 2.14318 0.600174 4.79254 0.600174C7.4419 0.600174 9.5852 2.71173 9.5852 5.30008C9.5852 7.88843 7.43198 9.99999 4.79254 9.99999ZM4.79254 1.17428C2.47063 1.17428 0.59524 3.02311 0.59524 5.30008C0.59524 7.56732 2.48055 9.41615 4.79254 9.41615C7.10453 9.41615 8.98984 7.56732 8.98984 5.30008C8.98984 3.02311 7.10453 1.17428 4.79254 1.17428Z" fill={"white"} />
                                                <path d="M4.84213 2.79933C3.93916 2.79933 3.19495 3.5194 3.19495 4.41462C3.19495 4.56058 3.31402 4.67734 3.46286 4.67734C3.6117 4.67734 3.73078 4.56058 3.73078 4.41462C3.73078 3.81132 4.22692 3.32479 4.84213 3.32479C5.45735 3.32479 5.95349 3.81132 5.95349 4.41462C5.95349 5.01792 5.45735 5.50445 4.84213 5.50445C4.69329 5.50445 4.57422 5.62122 4.57422 5.76718V6.55536C4.57422 6.70132 4.69329 6.81808 4.84213 6.81808C4.99097 6.81808 5.11005 6.70132 5.11005 6.55536V6.00071C5.89395 5.87421 6.48932 5.21253 6.48932 4.40489C6.48932 3.5194 5.75503 2.79933 4.84213 2.79933Z" fill={"white"} />
                                                <path d="M4.84213 7.98575C5.05037 7.98575 5.21918 7.8202 5.21918 7.61599C5.21918 7.41178 5.05037 7.24623 4.84213 7.24623C4.6339 7.24623 4.46509 7.41178 4.46509 7.61599C4.46509 7.8202 4.6339 7.98575 4.84213 7.98575Z" fill={"white"} />
                                            </svg>
                                        </BootstrapTooltip>
                                    </Stack>
                                    {
                                        loading ?
                                            <Stack>
                                                <Typography variant="span" className="value">
                                                    {APR ? (Number(APR) > 10000 ? "+10000" : APR) : 0}%
                                                </Typography>
                                            </Stack>
                                            :
                                            <Skeleton height={32} animation="wave" />
                                    }
                                </Stack>
                                <Stack className="item-4" spacing={0.75}>
                                    <Stack className="help" direction="row" spacing={1}>
                                        <Typography variant="span" className="title">
                                            {lang_texts[language][10]}
                                        </Typography>
                                        <BootstrapTooltip title={lang_texts[language][29]} placement="top">
                                            <svg width="14" height="14" viewBox="0 0 10 10" fill="none">
                                                <path d="M4.79254 9.99999C2.14318 9.99999 -0.00012207 7.88843 -0.00012207 5.30008C-0.00012207 2.71173 2.14318 0.600174 4.79254 0.600174C7.4419 0.600174 9.5852 2.71173 9.5852 5.30008C9.5852 7.88843 7.43198 9.99999 4.79254 9.99999ZM4.79254 1.17428C2.47063 1.17428 0.59524 3.02311 0.59524 5.30008C0.59524 7.56732 2.48055 9.41615 4.79254 9.41615C7.10453 9.41615 8.98984 7.56732 8.98984 5.30008C8.98984 3.02311 7.10453 1.17428 4.79254 1.17428Z" fill={"white"} />
                                                <path d="M4.84213 2.79933C3.93916 2.79933 3.19495 3.5194 3.19495 4.41462C3.19495 4.56058 3.31402 4.67734 3.46286 4.67734C3.6117 4.67734 3.73078 4.56058 3.73078 4.41462C3.73078 3.81132 4.22692 3.32479 4.84213 3.32479C5.45735 3.32479 5.95349 3.81132 5.95349 4.41462C5.95349 5.01792 5.45735 5.50445 4.84213 5.50445C4.69329 5.50445 4.57422 5.62122 4.57422 5.76718V6.55536C4.57422 6.70132 4.69329 6.81808 4.84213 6.81808C4.99097 6.81808 5.11005 6.70132 5.11005 6.55536V6.00071C5.89395 5.87421 6.48932 5.21253 6.48932 4.40489C6.48932 3.5194 5.75503 2.79933 4.84213 2.79933Z" fill={"white"} />
                                                <path d="M4.84213 7.98575C5.05037 7.98575 5.21918 7.8202 5.21918 7.61599C5.21918 7.41178 5.05037 7.24623 4.84213 7.24623C4.6339 7.24623 4.46509 7.41178 4.46509 7.61599C4.46509 7.8202 4.6339 7.98575 4.84213 7.98575Z" fill={"white"} />
                                            </svg>
                                        </BootstrapTooltip>
                                    </Stack>
                                    {
                                        loading ?
                                            <Stack>
                                                <LeftTime timeLeft={timeblog} device="laptop" poolState={poolState} loading={loading} />
                                                <Typography variant="span" className="description">
                                                    Days&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Hrs&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Min&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Sec
                                                </Typography>
                                            </Stack>
                                            :
                                            <Skeleton height={32} animation="wave" />
                                    }
                                </Stack>
                                <Stack className="item-5" spacing={0.5}>
                                    <Stack className="help" direction="row" spacing={1}>
                                        <Typography variant="span" className="title">
                                            {lang_texts[language][11]}
                                        </Typography>
                                        <BootstrapTooltip title={lang_texts[language][30]} placement="top">
                                            <svg width="14" height="14" viewBox="0 0 10 10" fill="none">
                                                <path d="M4.79254 9.99999C2.14318 9.99999 -0.00012207 7.88843 -0.00012207 5.30008C-0.00012207 2.71173 2.14318 0.600174 4.79254 0.600174C7.4419 0.600174 9.5852 2.71173 9.5852 5.30008C9.5852 7.88843 7.43198 9.99999 4.79254 9.99999ZM4.79254 1.17428C2.47063 1.17428 0.59524 3.02311 0.59524 5.30008C0.59524 7.56732 2.48055 9.41615 4.79254 9.41615C7.10453 9.41615 8.98984 7.56732 8.98984 5.30008C8.98984 3.02311 7.10453 1.17428 4.79254 1.17428Z" fill={"white"} />
                                                <path d="M4.84213 2.79933C3.93916 2.79933 3.19495 3.5194 3.19495 4.41462C3.19495 4.56058 3.31402 4.67734 3.46286 4.67734C3.6117 4.67734 3.73078 4.56058 3.73078 4.41462C3.73078 3.81132 4.22692 3.32479 4.84213 3.32479C5.45735 3.32479 5.95349 3.81132 5.95349 4.41462C5.95349 5.01792 5.45735 5.50445 4.84213 5.50445C4.69329 5.50445 4.57422 5.62122 4.57422 5.76718V6.55536C4.57422 6.70132 4.69329 6.81808 4.84213 6.81808C4.99097 6.81808 5.11005 6.70132 5.11005 6.55536V6.00071C5.89395 5.87421 6.48932 5.21253 6.48932 4.40489C6.48932 3.5194 5.75503 2.79933 4.84213 2.79933Z" fill={"white"} />
                                                <path d="M4.84213 7.98575C5.05037 7.98575 5.21918 7.8202 5.21918 7.61599C5.21918 7.41178 5.05037 7.24623 4.84213 7.24623C4.6339 7.24623 4.46509 7.41178 4.46509 7.61599C4.46509 7.8202 4.6339 7.98575 4.84213 7.98575Z" fill={"white"} />
                                            </svg>
                                        </BootstrapTooltip>
                                    </Stack>
                                    {
                                        loading ?
                                            <Stack>
                                                <Typography variant="span" className="sub-description">
                                                    {totalSupply ? numberWithCommas(totalSupply) : 0}{" "}{item.tokenId[0]}
                                                </Typography>
                                                <Typography variant="span" className="sub-description">
                                                    {totalSupply ? (totalSupply * (BaseCoin ? (Number(BaseCoin.price) > 0 ? BaseCoin.price : baseCurrency[item.tokenId[0]][currency]) : baseCurrency[item.tokenId[0]][currency])).toFixed(2) : 0}{" "}{currency}
                                                </Typography>
                                            </Stack>
                                            :
                                            <Skeleton height={32} animation="wave" />
                                    }
                                </Stack>
                                <Stack className="item-6" height={0} marginLeft={'-70px'}>
                                    <Link underline="none" target="_blank" href={item.chart.nomicsUrl}>
                                        <ChartBox AllData={chartInfo} id={item.chart.id[0]} coin={Coin} />
                                    </Link>
                                </Stack>
                                <Stack className="item-7">
                                    <Button
                                        onClick={() => handleExpand(item.id, null,)}
                                        variant="contained"
                                        endIcon={<ChevronRightIcon className={expand[item.id] === true ? "expand-icon activate" : "expand-icon"} />}
                                        disableElevation
                                        style={poolState ? {} : { backgroundColor: "rgb(255 46 46)", color: "white" }}
                                    >
                                        {
                                            poolState ?
                                                lang_texts[language][9]
                                                :
                                                lang_texts[language][24]
                                        }
                                    </Button>
                                </Stack>
                            </Stack>

                            <Collapse className="collapse" in={expand[item.id] === true ? true : false} timeout="auto" unmountOnExit>
                                <Stack className="collapse-body">
                                    <Stack className="collapse-1">
                                        <div className="nomics-ticker-widget"></div>
                                        <Stack className="sub-title">
                                            <Stack className="help" direction="row" spacing={1}>
                                                <Typography variant="span" className="title" alignSelf="flex-start">
                                                    {lang_texts[language][16]}
                                                </Typography>
                                                <BootstrapTooltip title={lang_texts[language][31]} placement="top">
                                                    <svg width="14" height="14" viewBox="0 0 10 10" fill="none">
                                                        <path d="M4.79254 9.99999C2.14318 9.99999 -0.00012207 7.88843 -0.00012207 5.30008C-0.00012207 2.71173 2.14318 0.600174 4.79254 0.600174C7.4419 0.600174 9.5852 2.71173 9.5852 5.30008C9.5852 7.88843 7.43198 9.99999 4.79254 9.99999ZM4.79254 1.17428C2.47063 1.17428 0.59524 3.02311 0.59524 5.30008C0.59524 7.56732 2.48055 9.41615 4.79254 9.41615C7.10453 9.41615 8.98984 7.56732 8.98984 5.30008C8.98984 3.02311 7.10453 1.17428 4.79254 1.17428Z" fill={"white"} />
                                                        <path d="M4.84213 2.79933C3.93916 2.79933 3.19495 3.5194 3.19495 4.41462C3.19495 4.56058 3.31402 4.67734 3.46286 4.67734C3.6117 4.67734 3.73078 4.56058 3.73078 4.41462C3.73078 3.81132 4.22692 3.32479 4.84213 3.32479C5.45735 3.32479 5.95349 3.81132 5.95349 4.41462C5.95349 5.01792 5.45735 5.50445 4.84213 5.50445C4.69329 5.50445 4.57422 5.62122 4.57422 5.76718V6.55536C4.57422 6.70132 4.69329 6.81808 4.84213 6.81808C4.99097 6.81808 5.11005 6.70132 5.11005 6.55536V6.00071C5.89395 5.87421 6.48932 5.21253 6.48932 4.40489C6.48932 3.5194 5.75503 2.79933 4.84213 2.79933Z" fill={"white"} />
                                                        <path d="M4.84213 7.98575C5.05037 7.98575 5.21918 7.8202 5.21918 7.61599C5.21918 7.41178 5.05037 7.24623 4.84213 7.24623C4.6339 7.24623 4.46509 7.41178 4.46509 7.61599C4.46509 7.8202 4.6339 7.98575 4.84213 7.98575Z" fill={"white"} />
                                                    </svg>
                                                </BootstrapTooltip>
                                            </Stack>
                                            <Typography variant="span" className="sub-description" alignSelf="flex-start">
                                                {(() => {
                                                    if (Number(balance[item.tokenId[0]]) > 0) {
                                                        return `${numberWithCommas(customToFixed(new BigNumber(balance[item.tokenId[0]]).div(new BigNumber(10).pow(tokenDecimals.BaseDecimal)), 3))} ${item.tokenId[0]}`;
                                                    } else {
                                                        return `0 ${item.tokenId[0]}`;
                                                    }
                                                })()}
                                            </Typography>
                                        </Stack>
                                        <Stack direction="row" spacing={1.25} mb={2}>
                                            <Stack className="col-row-1">
                                                <OutlinedInput
                                                    disabled={Number(balance[item.tokenId[0]]) > 0 && poolState ? false : true}
                                                    className={Number(balance[item.tokenId[0]]) > 0 && poolState ? "cal-in bg-white" : "cal-in disabled"}
                                                    placeholder="0"
                                                    value={dv}
                                                    onChange={(e) => setDV(e.target.value)}
                                                    type="number"
                                                    endAdornment={
                                                        <Typography onClick={setMax} variant="span" className={Number(balance[item.tokenId[0]]) > 0 && poolState ? "sub-description c-max" : "sub-description"}>
                                                            Max
                                                        </Typography>
                                                    }
                                                />
                                            </Stack>
                                            <Stack className={Number(balance[item.tokenId[0]]) > 0 && poolState ? "col-row-2" : "col-row-2 disabled"}>
                                                {
                                                    dloading ? <LoadingButton loading variant="contained" className="earn-btn"></LoadingButton> :
                                                        <Button
                                                            variant="contained"
                                                            onClick={deposit}
                                                            disabled={Number(balance[item.tokenId[0]]) > 0 && poolState ? false : true}
                                                            className={Number(balance[item.tokenId[0]]) > 0 && poolState ? "earn-btn" : "earn-btn disabled"}
                                                        >
                                                            {lang_texts[language][18]}{' '}{item.tokenId[0]}
                                                        </Button>
                                                }
                                            </Stack>
                                        </Stack>
                                        <Stack className="sub-title">
                                            <Stack className="help" direction="row" spacing={1}>
                                                <Typography variant="span" className="title" alignSelf="flex-start">
                                                    {lang_texts[language][17]}
                                                </Typography>
                                                <BootstrapTooltip title={lang_texts[language][32]} placement="top">
                                                    <svg width="14" height="14" viewBox="0 0 10 10" fill="none">
                                                        <path d="M4.79254 9.99999C2.14318 9.99999 -0.00012207 7.88843 -0.00012207 5.30008C-0.00012207 2.71173 2.14318 0.600174 4.79254 0.600174C7.4419 0.600174 9.5852 2.71173 9.5852 5.30008C9.5852 7.88843 7.43198 9.99999 4.79254 9.99999ZM4.79254 1.17428C2.47063 1.17428 0.59524 3.02311 0.59524 5.30008C0.59524 7.56732 2.48055 9.41615 4.79254 9.41615C7.10453 9.41615 8.98984 7.56732 8.98984 5.30008C8.98984 3.02311 7.10453 1.17428 4.79254 1.17428Z" fill={"white"} />
                                                        <path d="M4.84213 2.79933C3.93916 2.79933 3.19495 3.5194 3.19495 4.41462C3.19495 4.56058 3.31402 4.67734 3.46286 4.67734C3.6117 4.67734 3.73078 4.56058 3.73078 4.41462C3.73078 3.81132 4.22692 3.32479 4.84213 3.32479C5.45735 3.32479 5.95349 3.81132 5.95349 4.41462C5.95349 5.01792 5.45735 5.50445 4.84213 5.50445C4.69329 5.50445 4.57422 5.62122 4.57422 5.76718V6.55536C4.57422 6.70132 4.69329 6.81808 4.84213 6.81808C4.99097 6.81808 5.11005 6.70132 5.11005 6.55536V6.00071C5.89395 5.87421 6.48932 5.21253 6.48932 4.40489C6.48932 3.5194 5.75503 2.79933 4.84213 2.79933Z" fill={"white"} />
                                                        <path d="M4.84213 7.98575C5.05037 7.98575 5.21918 7.8202 5.21918 7.61599C5.21918 7.41178 5.05037 7.24623 4.84213 7.24623C4.6339 7.24623 4.46509 7.41178 4.46509 7.61599C4.46509 7.8202 4.6339 7.98575 4.84213 7.98575Z" fill={"white"} />
                                                    </svg>
                                                </BootstrapTooltip>
                                            </Stack>

                                            <Typography variant="span" className="sub-description" alignSelf="flex-start">
                                                {numberWithCommas(customToFixed(new BigNumber(sb).div(new BigNumber(10).pow(tokenDecimals.BaseDecimal)), 3))}{" "}{item.tokenId[0]}
                                            </Typography>
                                        </Stack>
                                        <Stack direction="row" spacing={1.25}>
                                            <Stack className="col-row-1">
                                                <OutlinedInput
                                                    disabled={Number(sb) > 0 ? false : true}
                                                    className={Number(sb) > 0 ? "cal-in bg-white" : "cal-in disabled"}
                                                    placeholder="0"
                                                    value={wv}
                                                    type="number"
                                                    onChange={(e) => setWV(e.target.value)}
                                                    endAdornment={
                                                        <Typography onClick={setWmax} variant="span" className={Number(sb) > 0 ? "sub-description c-max" : "sub-description"}>
                                                            Max
                                                        </Typography>
                                                    }
                                                />
                                            </Stack>
                                            <Stack className="col-row-2">
                                                {
                                                    wloading ? <LoadingButton loading variant="contained" className="return-btn"></LoadingButton> :
                                                        <Button
                                                            variant="contained"
                                                            className={Number(sb) > 0 ? "return-btn" : "return-btn disabled"}
                                                            onClick={withdraw}
                                                        >
                                                            {lang_texts[language][19]}{' '}{item.tokenId[0]}
                                                        </Button>
                                                }
                                            </Stack>
                                        </Stack>
                                    </Stack>
                                    <Stack className={cb > 0 ? "bg-green collapse-2" : "collapse-2"}>
                                        <Stack spacing={0.3} lineHeight={1}>
                                            <Stack className="help" direction="row" spacing={1}>
                                                <Typography variant="span" className="title">
                                                    {lang_texts[language][20]}
                                                </Typography>
                                                <BootstrapTooltip title={lang_texts[language][33]} placement="top">
                                                    <svg width="14" height="14" viewBox="0 0 10 10" fill="none">
                                                        <path d="M4.79254 9.99999C2.14318 9.99999 -0.00012207 7.88843 -0.00012207 5.30008C-0.00012207 2.71173 2.14318 0.600174 4.79254 0.600174C7.4419 0.600174 9.5852 2.71173 9.5852 5.30008C9.5852 7.88843 7.43198 9.99999 4.79254 9.99999ZM4.79254 1.17428C2.47063 1.17428 0.59524 3.02311 0.59524 5.30008C0.59524 7.56732 2.48055 9.41615 4.79254 9.41615C7.10453 9.41615 8.98984 7.56732 8.98984 5.30008C8.98984 3.02311 7.10453 1.17428 4.79254 1.17428Z" fill="black" />
                                                        <path d="M4.84213 2.79933C3.93916 2.79933 3.19495 3.5194 3.19495 4.41462C3.19495 4.56058 3.31402 4.67734 3.46286 4.67734C3.6117 4.67734 3.73078 4.56058 3.73078 4.41462C3.73078 3.81132 4.22692 3.32479 4.84213 3.32479C5.45735 3.32479 5.95349 3.81132 5.95349 4.41462C5.95349 5.01792 5.45735 5.50445 4.84213 5.50445C4.69329 5.50445 4.57422 5.62122 4.57422 5.76718V6.55536C4.57422 6.70132 4.69329 6.81808 4.84213 6.81808C4.99097 6.81808 5.11005 6.70132 5.11005 6.55536V6.00071C5.89395 5.87421 6.48932 5.21253 6.48932 4.40489C6.48932 3.5194 5.75503 2.79933 4.84213 2.79933Z" fill="black" />
                                                        <path d="M4.84213 7.98575C5.05037 7.98575 5.21918 7.8202 5.21918 7.61599C5.21918 7.41178 5.05037 7.24623 4.84213 7.24623C4.6339 7.24623 4.46509 7.41178 4.46509 7.61599C4.46509 7.8202 4.6339 7.98575 4.84213 7.98575Z" fill="black" />
                                                    </svg>
                                                </BootstrapTooltip>
                                            </Stack>
                                            <Stack spacing={1}>
                                                <ClaimTime claimedAt={claimedAt} claimState={cb} rewardCycle={rewardCycle} UpdateInfo={UpdateAllInfo} />
                                                <Typography variant="span" className="sub-description">
                                                    {cb}{" "}{item.tokenId[1]}
                                                </Typography>
                                            </Stack>
                                        </Stack>
                                        {
                                            // cloading === true ? <LoadingButton loading variant="contained" color="black"></LoadingButton> :
                                            <Button
                                                variant="contained"
                                                className={cb > 0 ? "" : "disabled"}
                                                onClick={claim}
                                            >
                                                {lang_texts[language][24]}
                                            </Button>
                                        }
                                    </Stack>
                                    <Stack className="collapse-3">
                                        <Stack className="help" direction="row" spacing={1}>
                                            <Typography variant="span" className="title">
                                                {lang_texts[language][25]}
                                            </Typography>
                                            <BootstrapTooltip title={lang_texts[language][33]} placement="top">
                                                <svg width="14" height="14" viewBox="0 0 10 10" fill="none">
                                                    <path d="M4.79254 9.99999C2.14318 9.99999 -0.00012207 7.88843 -0.00012207 5.30008C-0.00012207 2.71173 2.14318 0.600174 4.79254 0.600174C7.4419 0.600174 9.5852 2.71173 9.5852 5.30008C9.5852 7.88843 7.43198 9.99999 4.79254 9.99999ZM4.79254 1.17428C2.47063 1.17428 0.59524 3.02311 0.59524 5.30008C0.59524 7.56732 2.48055 9.41615 4.79254 9.41615C7.10453 9.41615 8.98984 7.56732 8.98984 5.30008C8.98984 3.02311 7.10453 1.17428 4.79254 1.17428Z" fill={"white"} />
                                                    <path d="M4.84213 2.79933C3.93916 2.79933 3.19495 3.5194 3.19495 4.41462C3.19495 4.56058 3.31402 4.67734 3.46286 4.67734C3.6117 4.67734 3.73078 4.56058 3.73078 4.41462C3.73078 3.81132 4.22692 3.32479 4.84213 3.32479C5.45735 3.32479 5.95349 3.81132 5.95349 4.41462C5.95349 5.01792 5.45735 5.50445 4.84213 5.50445C4.69329 5.50445 4.57422 5.62122 4.57422 5.76718V6.55536C4.57422 6.70132 4.69329 6.81808 4.84213 6.81808C4.99097 6.81808 5.11005 6.70132 5.11005 6.55536V6.00071C5.89395 5.87421 6.48932 5.21253 6.48932 4.40489C6.48932 3.5194 5.75503 2.79933 4.84213 2.79933Z" fill={"white"} />
                                                    <path d="M4.84213 7.98575C5.05037 7.98575 5.21918 7.8202 5.21918 7.61599C5.21918 7.41178 5.05037 7.24623 4.84213 7.24623C4.6339 7.24623 4.46509 7.41178 4.46509 7.61599C4.46509 7.8202 4.6339 7.98575 4.84213 7.98575Z" fill={"white"} />
                                                </svg>
                                            </BootstrapTooltip>
                                        </Stack>
                                        <Stack className="currency-control-box" spacing={1}>
                                            <Input
                                                id="input-with-icon-adornment"
                                                endAdornment={
                                                    <Typography variant="span" className="sub-description">
                                                        {item.tokenId[0]}
                                                    </Typography>
                                                }
                                                disabled={!poolState}
                                                value={Number(slider) === 0 ? '' : slider}
                                                onChange={(e) => {
                                                    Number(e.target.value) > Number(tokenTotalS) || Number(e.target.value) < 0 ? null : setSlider(e.target.value)
                                                }}
                                                placeholder="0"
                                                type="number"

                                            />
                                            <Input
                                                id="input-with-icon-adornment"
                                                endAdornment={
                                                    <Typography variant="span" className="sub-description">
                                                        {currency}
                                                    </Typography>
                                                }
                                                disabled={!poolState}
                                                readOnly={true}
                                                value={numberWithCommas(toDec((BaseCoin ? (Number(BaseCoin.price) > 0 ? BaseCoin.price : baseCurrency[item.tokenId[0]][currency]) : baseCurrency[item.tokenId[0]][currency]) * slider, 0, 2))}
                                                placeholder="0"
                                            />
                                        </Stack>
                                        <Slider
                                            aria-label="Temperature"
                                            defaultValue={0}
                                            value={Number(slider)}
                                            onChange={(e) => setSlider(e.target.value)}
                                            color="primary"
                                            min={0}
                                            max={Number(tokenTotalS)}
                                            disabled={!poolState}
                                            className="slider"
                                        />
                                    </Stack>
                                    <Stack className="collapse-5" spacing={3}>
                                        <Stack spacing={1.25}>
                                            <Stack spacing={1}>
                                                <Typography variant="span" className="sub-description">
                                                    {lang_texts[language][26]}
                                                </Typography>
                                                <Stack justifyContent="flex-start" spacing={0.5}>
                                                    <Typography variant="span" className="sub-description">
                                                        {numberWithCommas(toDec(Number(slider) > 0 ? slider * DR : 0, 0, 2))}{" "}{item.tokenId[1]}
                                                    </Typography>
                                                    <Typography variant="span" className="sub-description">
                                                        {CurrencySymbol[currency]}{numberWithCommas(toDec((Number(slider) > 0 ? slider * DR : 0) * (Coin ? (Number(Coin.price) > 0 ? Coin.price : baseCurrency[item.tokenId[1]][currency]) : baseCurrency[item.tokenId[1]][currency]), 0, 2))}{" "}{currency}
                                                    </Typography>

                                                </Stack>
                                            </Stack>
                                            <Stack spacing={1}>
                                                <Typography variant="span" className="sub-description">
                                                    {lang_texts[language][27]}
                                                </Typography>
                                                <Stack justifyContent="flex-start" spacing={0.5}>
                                                    <Typography variant="span" className="sub-description">
                                                        {numberWithCommas(toDec(Number(slider) > 0 ? slider * CR : 0, 0, 2))}{" "}{item.tokenId[1]}
                                                    </Typography>
                                                    <Typography variant="span" className="sub-description">
                                                        {CurrencySymbol[currency]}{numberWithCommas(toDec((Number(slider) > 0 ? slider * CR : 0) * (Coin ? (Number(Coin.price) > 0 ? Coin.price : baseCurrency[item.tokenId[1]][currency]) : baseCurrency[item.tokenId[1]][currency]), 0, 2))}{" "}{currency}
                                                    </Typography>
                                                </Stack>
                                            </Stack>
                                        </Stack>
                                    </Stack>
                                </Stack>
                            </Collapse>
                        </Box>
                    )
                } else {
                    return <Box>
                        <Stack className="item-box" onClick={(e) => handleExpand(item.id, e, index)}>
                            <Stack className="item-1" spacing={0.75}>
                                <Typography variant="span" className="value">
                                    {lang_texts[language][8]}{' '}{item.tokenId[1]}
                                </Typography>
                                <Stack spacing={1} direction="row">
                                    <Typography variant="span" className="sub-description">
                                        {lang_texts[language][9]}{' '}{item.tokenId[0]}
                                    </Typography>
                                </Stack>
                            </Stack>
                            <Stack className="item-3" spacing={0.75}>
                                <Stack className="help" direction="row" spacing={1}>
                                    <Typography variant="span" className="title">
                                        APR
                                    </Typography>
                                    <BootstrapTooltip title={lang_texts[language][28]} placement="top">
                                        <svg width="14" height="14" viewBox="0 0 10 10" fill="none">
                                            <path d="M4.79254 9.99999C2.14318 9.99999 -0.00012207 7.88843 -0.00012207 5.30008C-0.00012207 2.71173 2.14318 0.600174 4.79254 0.600174C7.4419 0.600174 9.5852 2.71173 9.5852 5.30008C9.5852 7.88843 7.43198 9.99999 4.79254 9.99999ZM4.79254 1.17428C2.47063 1.17428 0.59524 3.02311 0.59524 5.30008C0.59524 7.56732 2.48055 9.41615 4.79254 9.41615C7.10453 9.41615 8.98984 7.56732 8.98984 5.30008C8.98984 3.02311 7.10453 1.17428 4.79254 1.17428Z" fill={"white"} />
                                            <path d="M4.84213 2.79933C3.93916 2.79933 3.19495 3.5194 3.19495 4.41462C3.19495 4.56058 3.31402 4.67734 3.46286 4.67734C3.6117 4.67734 3.73078 4.56058 3.73078 4.41462C3.73078 3.81132 4.22692 3.32479 4.84213 3.32479C5.45735 3.32479 5.95349 3.81132 5.95349 4.41462C5.95349 5.01792 5.45735 5.50445 4.84213 5.50445C4.69329 5.50445 4.57422 5.62122 4.57422 5.76718V6.55536C4.57422 6.70132 4.69329 6.81808 4.84213 6.81808C4.99097 6.81808 5.11005 6.70132 5.11005 6.55536V6.00071C5.89395 5.87421 6.48932 5.21253 6.48932 4.40489C6.48932 3.5194 5.75503 2.79933 4.84213 2.79933Z" fill={"white"} />
                                            <path d="M4.84213 7.98575C5.05037 7.98575 5.21918 7.8202 5.21918 7.61599C5.21918 7.41178 5.05037 7.24623 4.84213 7.24623C4.6339 7.24623 4.46509 7.41178 4.46509 7.61599C4.46509 7.8202 4.6339 7.98575 4.84213 7.98575Z" fill={"white"} />
                                        </svg>
                                    </BootstrapTooltip>
                                </Stack>
                                {
                                    loading ?
                                        <Stack>
                                            <Typography variant="span" className="value">
                                                {APR ? (Number(APR) > 10000 ? "+10000" : APR) : 0}%
                                            </Typography>
                                        </Stack>
                                        :
                                        <Skeleton height={32} animation="wave" />
                                }
                            </Stack>
                            <Stack className="item-4" spacing={0.75}>
                                <Stack className="help" direction="row" spacing={1}>
                                    <Typography variant="span" className="title">
                                        {lang_texts[language][10]}
                                    </Typography>
                                    <BootstrapTooltip title={lang_texts[language][29]} placement="top">
                                        <svg width="14" height="14" viewBox="0 0 10 10" fill="none">
                                            <path d="M4.79254 9.99999C2.14318 9.99999 -0.00012207 7.88843 -0.00012207 5.30008C-0.00012207 2.71173 2.14318 0.600174 4.79254 0.600174C7.4419 0.600174 9.5852 2.71173 9.5852 5.30008C9.5852 7.88843 7.43198 9.99999 4.79254 9.99999ZM4.79254 1.17428C2.47063 1.17428 0.59524 3.02311 0.59524 5.30008C0.59524 7.56732 2.48055 9.41615 4.79254 9.41615C7.10453 9.41615 8.98984 7.56732 8.98984 5.30008C8.98984 3.02311 7.10453 1.17428 4.79254 1.17428Z" fill={"white"} />
                                            <path d="M4.84213 2.79933C3.93916 2.79933 3.19495 3.5194 3.19495 4.41462C3.19495 4.56058 3.31402 4.67734 3.46286 4.67734C3.6117 4.67734 3.73078 4.56058 3.73078 4.41462C3.73078 3.81132 4.22692 3.32479 4.84213 3.32479C5.45735 3.32479 5.95349 3.81132 5.95349 4.41462C5.95349 5.01792 5.45735 5.50445 4.84213 5.50445C4.69329 5.50445 4.57422 5.62122 4.57422 5.76718V6.55536C4.57422 6.70132 4.69329 6.81808 4.84213 6.81808C4.99097 6.81808 5.11005 6.70132 5.11005 6.55536V6.00071C5.89395 5.87421 6.48932 5.21253 6.48932 4.40489C6.48932 3.5194 5.75503 2.79933 4.84213 2.79933Z" fill={"white"} />
                                            <path d="M4.84213 7.98575C5.05037 7.98575 5.21918 7.8202 5.21918 7.61599C5.21918 7.41178 5.05037 7.24623 4.84213 7.24623C4.6339 7.24623 4.46509 7.41178 4.46509 7.61599C4.46509 7.8202 4.6339 7.98575 4.84213 7.98575Z" fill={"white"} />
                                        </svg>
                                    </BootstrapTooltip>
                                </Stack>
                                {
                                    loading ?
                                        <Stack>
                                            <LeftTime timeLeft={timeblog} device="mobile" poolState={poolState} loading={loading} />
                                            <Typography variant="span" className="description">
                                                Days&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Hrs&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Min
                                            </Typography>
                                        </Stack>
                                        :
                                        <Skeleton height={32} animation="wave" />
                                }
                            </Stack>
                            {
                                mobile ?
                                    <Stack className="item-5" spacing={0.5}>
                                        <Stack className="help" direction="row" spacing={1}>
                                            <Typography variant="span" className="title">
                                                {lang_texts[language][11]}
                                            </Typography>
                                            <BootstrapTooltip title={lang_texts[language][30]} placement="top">
                                                <svg width="14" height="14" viewBox="0 0 10 10" fill="none">
                                                    <path d="M4.79254 9.99999C2.14318 9.99999 -0.00012207 7.88843 -0.00012207 5.30008C-0.00012207 2.71173 2.14318 0.600174 4.79254 0.600174C7.4419 0.600174 9.5852 2.71173 9.5852 5.30008C9.5852 7.88843 7.43198 9.99999 4.79254 9.99999ZM4.79254 1.17428C2.47063 1.17428 0.59524 3.02311 0.59524 5.30008C0.59524 7.56732 2.48055 9.41615 4.79254 9.41615C7.10453 9.41615 8.98984 7.56732 8.98984 5.30008C8.98984 3.02311 7.10453 1.17428 4.79254 1.17428Z" fill={"white"} />
                                                    <path d="M4.84213 2.79933C3.93916 2.79933 3.19495 3.5194 3.19495 4.41462C3.19495 4.56058 3.31402 4.67734 3.46286 4.67734C3.6117 4.67734 3.73078 4.56058 3.73078 4.41462C3.73078 3.81132 4.22692 3.32479 4.84213 3.32479C5.45735 3.32479 5.95349 3.81132 5.95349 4.41462C5.95349 5.01792 5.45735 5.50445 4.84213 5.50445C4.69329 5.50445 4.57422 5.62122 4.57422 5.76718V6.55536C4.57422 6.70132 4.69329 6.81808 4.84213 6.81808C4.99097 6.81808 5.11005 6.70132 5.11005 6.55536V6.00071C5.89395 5.87421 6.48932 5.21253 6.48932 4.40489C6.48932 3.5194 5.75503 2.79933 4.84213 2.79933Z" fill={"white"} />
                                                    <path d="M4.84213 7.98575C5.05037 7.98575 5.21918 7.8202 5.21918 7.61599C5.21918 7.41178 5.05037 7.24623 4.84213 7.24623C4.6339 7.24623 4.46509 7.41178 4.46509 7.61599C4.46509 7.8202 4.6339 7.98575 4.84213 7.98575Z" fill={"white"} />
                                                </svg>
                                            </BootstrapTooltip>
                                        </Stack>
                                        {
                                            loading ?
                                                <Stack>
                                                    <Typography variant="span" className="sub-description">
                                                        {totalSupply ? numberWithCommas(totalSupply) : 0}{" "}{item.tokenId[0]}
                                                    </Typography>
                                                    <Typography variant="span" className="sub-description">
                                                        {totalSupply ? (totalSupply * (BaseCoin ? (Number(BaseCoin.price) > 0 ? BaseCoin.price : baseCurrency[item.tokenId[0]][currency]) : baseCurrency[item.tokenId[0]][currency])).toFixed(2) : 0}{" "}{currency}
                                                    </Typography>
                                                </Stack>
                                                :
                                                <Skeleton height={32} animation="wave" />
                                        }
                                    </Stack> : null
                            }
                            <Stack className="item-7">
                                <IconButton

                                    className="mobile-expand-icon"
                                >
                                    <ChevronRightIcon className={expand[item.id] === true ? "expand-icon activate" : "expand-icon"} />
                                </IconButton>
                            </Stack>
                        </Stack>
                        <Collapse className="collapse" in={expand[item.id] === true ? true : false} timeout="auto" unmountOnExit>

                            <Stack className="collapse-body-mobile" spacing={3}>
                                <Stack className="collapse-1">
                                    <div className="nomics-ticker-widget" data-name={item.chart.name} data-base={item.chart.id[0]} data-quote={currency}></div>
                                </Stack>
                                <Stack spacing={3} direction={!mobile && !tablet ? "column" : "row"}>
                                    <Stack className="collapse-2" spacing={1}>
                                        <Stack>
                                            <Stack className="help" direction="row" spacing={1}>
                                                <Typography variant="span" className="sub-title" alignSelf="flex-start">
                                                    {lang_texts[language][16]}
                                                </Typography>
                                                <BootstrapTooltip title={lang_texts[language][31]} placement="top">
                                                    <svg width="16" height="16" viewBox="0 0 10 10" fill="none">
                                                        <path d="M4.79254 9.99999C2.14318 9.99999 -0.00012207 7.88843 -0.00012207 5.30008C-0.00012207 2.71173 2.14318 0.600174 4.79254 0.600174C7.4419 0.600174 9.5852 2.71173 9.5852 5.30008C9.5852 7.88843 7.43198 9.99999 4.79254 9.99999ZM4.79254 1.17428C2.47063 1.17428 0.59524 3.02311 0.59524 5.30008C0.59524 7.56732 2.48055 9.41615 4.79254 9.41615C7.10453 9.41615 8.98984 7.56732 8.98984 5.30008C8.98984 3.02311 7.10453 1.17428 4.79254 1.17428Z" fill={"white"} />
                                                        <path d="M4.84213 2.79933C3.93916 2.79933 3.19495 3.5194 3.19495 4.41462C3.19495 4.56058 3.31402 4.67734 3.46286 4.67734C3.6117 4.67734 3.73078 4.56058 3.73078 4.41462C3.73078 3.81132 4.22692 3.32479 4.84213 3.32479C5.45735 3.32479 5.95349 3.81132 5.95349 4.41462C5.95349 5.01792 5.45735 5.50445 4.84213 5.50445C4.69329 5.50445 4.57422 5.62122 4.57422 5.76718V6.55536C4.57422 6.70132 4.69329 6.81808 4.84213 6.81808C4.99097 6.81808 5.11005 6.70132 5.11005 6.55536V6.00071C5.89395 5.87421 6.48932 5.21253 6.48932 4.40489C6.48932 3.5194 5.75503 2.79933 4.84213 2.79933Z" fill={"white"} />
                                                        <path d="M4.84213 7.98575C5.05037 7.98575 5.21918 7.8202 5.21918 7.61599C5.21918 7.41178 5.05037 7.24623 4.84213 7.24623C4.6339 7.24623 4.46509 7.41178 4.46509 7.61599C4.46509 7.8202 4.6339 7.98575 4.84213 7.98575Z" fill={"white"} />
                                                    </svg>
                                                </BootstrapTooltip>
                                            </Stack>
                                            <Typography variant="span" className="title">
                                                {(() => {
                                                    if (Number(balance[item.tokenId[0]])) {
                                                        return `${numberWithCommas(customToFixed(new BigNumber(balance[item.tokenId[0]]).div(new BigNumber(10).pow(tokenDecimals.BaseDecimal)), 3))} ${item.tokenId[0]}`;
                                                    } else {
                                                        return `0 ${item.tokenId[0]}`;
                                                    }
                                                })()}
                                            </Typography>
                                        </Stack>
                                        <OutlinedInput
                                            disabled={Number(balance[item.tokenId[0]]) > 0 && poolState ? false : true}
                                            className={Number(balance[item.tokenId[0]]) > 0 && poolState ? "cal-in bg-white" : "cal-in disabled"}
                                            placeholder="0"
                                            value={dv}
                                            onChange={(e) => setDV(e.target.value)}
                                            endAdornment={
                                                <Typography
                                                    onClick={setMax}
                                                    variant="span"
                                                    className={Number(balance[item.tokenId[0]]) > 0 && poolState ? "sub-description c-max" : "sub-description"}
                                                >
                                                    Max
                                                </Typography>
                                            }
                                        />
                                        {
                                            <Button
                                                variant="contained"
                                                onClick={deposit}
                                                disabled={Number(balance[item.tokenId[0]]) > 0 && poolState ? false : true}
                                                className={Number(balance[item.tokenId[0]]) > 0 && poolState ? "" : "disabled"}
                                            >
                                                {lang_texts[language][18]}{' '}{item.tokenId[0]}
                                            </Button>
                                        }
                                    </Stack>
                                    <Stack className="collapse-3" spacing={1}>
                                        <Stack>
                                            <Stack className="help" direction="row" spacing={1}>
                                                <Typography variant="span" className="sub-title" alignSelf="flex-start">
                                                    {lang_texts[language][17]}
                                                </Typography>
                                                <BootstrapTooltip title={lang_texts[language][32]} placement="top">
                                                    <svg width="16" height="16" viewBox="0 0 10 10" fill="none">
                                                        <path d="M4.79254 9.99999C2.14318 9.99999 -0.00012207 7.88843 -0.00012207 5.30008C-0.00012207 2.71173 2.14318 0.600174 4.79254 0.600174C7.4419 0.600174 9.5852 2.71173 9.5852 5.30008C9.5852 7.88843 7.43198 9.99999 4.79254 9.99999ZM4.79254 1.17428C2.47063 1.17428 0.59524 3.02311 0.59524 5.30008C0.59524 7.56732 2.48055 9.41615 4.79254 9.41615C7.10453 9.41615 8.98984 7.56732 8.98984 5.30008C8.98984 3.02311 7.10453 1.17428 4.79254 1.17428Z" fill={"white"} />
                                                        <path d="M4.84213 2.79933C3.93916 2.79933 3.19495 3.5194 3.19495 4.41462C3.19495 4.56058 3.31402 4.67734 3.46286 4.67734C3.6117 4.67734 3.73078 4.56058 3.73078 4.41462C3.73078 3.81132 4.22692 3.32479 4.84213 3.32479C5.45735 3.32479 5.95349 3.81132 5.95349 4.41462C5.95349 5.01792 5.45735 5.50445 4.84213 5.50445C4.69329 5.50445 4.57422 5.62122 4.57422 5.76718V6.55536C4.57422 6.70132 4.69329 6.81808 4.84213 6.81808C4.99097 6.81808 5.11005 6.70132 5.11005 6.55536V6.00071C5.89395 5.87421 6.48932 5.21253 6.48932 4.40489C6.48932 3.5194 5.75503 2.79933 4.84213 2.79933Z" fill={"white"} />
                                                        <path d="M4.84213 7.98575C5.05037 7.98575 5.21918 7.8202 5.21918 7.61599C5.21918 7.41178 5.05037 7.24623 4.84213 7.24623C4.6339 7.24623 4.46509 7.41178 4.46509 7.61599C4.46509 7.8202 4.6339 7.98575 4.84213 7.98575Z" fill={"white"} />
                                                    </svg>
                                                </BootstrapTooltip>
                                            </Stack>
                                            <Typography variant="span" className="title">
                                                {numberWithCommas(customToFixed(new BigNumber(sb).div(new BigNumber(10).pow(tokenDecimals.BaseDecimal)), 3))}{" "}{item.tokenId[0]}
                                            </Typography>
                                        </Stack>
                                        <OutlinedInput
                                            placeholder="0"
                                            disabled={sb > 0 ? false : true}
                                            className={sb > 0 ? "cal-in bg-white" : "cal-in disabled"}
                                            value={wv}
                                            onChange={(e) => setWV(e.target.value)}
                                            endAdornment={
                                                <Typography onClick={setWmax} variant="span" className={Number(sb) > 0 ? "sub-description c-max" : "sub-description"}>
                                                    Max
                                                </Typography>
                                            }
                                        />
                                        {
                                            wloading ? <LoadingButton loading variant="contained" className="return-btn"></LoadingButton> :
                                                <Button
                                                    variant="contained"
                                                    className={sb > 0 ? "return-btn" : "return-btn disabled-mb"}
                                                    onClick={withdraw}
                                                >
                                                    {lang_texts[language][19]}{' '}{item.tokenId[0]}
                                                </Button>
                                        }
                                    </Stack>
                                </Stack>
                                <Stack spacing={1}>
                                    <Typography variant="span" className="sub-title">
                                        {lang_texts[language][25]}
                                    </Typography>
                                    <Stack direction={mobile ? "row" : "column"} spacing={1.25} lineHeight={1}>
                                        <Stack className={mobile ? "w-50" : ""} spacing={1}>
                                            <Typography variant="span" className="title">
                                                {lang_texts[language][26]}
                                            </Typography>
                                            <Stack justifyContent="flex-start" spacing={0.5}>
                                                <Typography variant="span" className="title">
                                                    {numberWithCommas(customToFixed(new BigNumber(DR).times(new BigNumber(sb).div(new BigNumber(10).pow(tokenDecimals.BaseDecimal))).toString(), 2))}{" "}{item.tokenId[1]}
                                                </Typography>
                                                <Typography variant="span" className="title">
                                                    {CurrencySymbol[currency]}{numberWithCommas(toDec(new BigNumber(DR).times(new BigNumber(sb).div(new BigNumber(10).pow(tokenDecimals.BaseDecimal))).toString() * (Coin ? (Number(Coin.price) > 0 ? Coin.price : baseCurrency[item.tokenId[1]][currency]) : baseCurrency[item.tokenId[1]][currency]), 0, 3))}{currency}
                                                </Typography>

                                            </Stack>
                                        </Stack>
                                        <Stack spacing={1}>
                                            <Typography variant="span" className="title">
                                                {lang_texts[language][27]}
                                            </Typography>
                                            <Stack justifyContent="flex-start" spacing={0.5}>
                                                <Typography variant="span" className="title">
                                                    {numberWithCommas(customToFixed(new BigNumber(CR).times(new BigNumber(sb).div(new BigNumber(10).pow(tokenDecimals.BaseDecimal))).toString(), 2))}{" "}{item.tokenId[1]}
                                                </Typography>
                                                <Typography variant="span" className="title">
                                                    {CurrencySymbol[currency]}{numberWithCommas(toDec(new BigNumber(CR).times(new BigNumber(sb).div(new BigNumber(10).pow(tokenDecimals.BaseDecimal))).toString() * (Coin ? (Number(Coin.price) > 0 ? Coin.price : baseCurrency[item.tokenId[1]][currency]) : baseCurrency[item.tokenId[1]][currency]), 0, 2))}{currency}
                                                </Typography>
                                            </Stack>
                                        </Stack>
                                    </Stack>
                                </Stack>
                                <Stack className={cb > 0 ? "bg-green collapse-4" : "collapse-4"}>
                                    <Stack spacing={0.3} lineHeight={1}>
                                        <Stack className="help" direction="row" spacing={1}>
                                            <Typography variant="span" className="title">
                                                {lang_texts[language][20]}
                                            </Typography>
                                            <BootstrapTooltip title={lang_texts[language][33]} placement="top">
                                                <svg width="14" height="14" viewBox="0 0 10 10" fill="none">
                                                    <path d="M4.79254 9.99999C2.14318 9.99999 -0.00012207 7.88843 -0.00012207 5.30008C-0.00012207 2.71173 2.14318 0.600174 4.79254 0.600174C7.4419 0.600174 9.5852 2.71173 9.5852 5.30008C9.5852 7.88843 7.43198 9.99999 4.79254 9.99999ZM4.79254 1.17428C2.47063 1.17428 0.59524 3.02311 0.59524 5.30008C0.59524 7.56732 2.48055 9.41615 4.79254 9.41615C7.10453 9.41615 8.98984 7.56732 8.98984 5.30008C8.98984 3.02311 7.10453 1.17428 4.79254 1.17428Z" fill="black" />
                                                    <path d="M4.84213 2.79933C3.93916 2.79933 3.19495 3.5194 3.19495 4.41462C3.19495 4.56058 3.31402 4.67734 3.46286 4.67734C3.6117 4.67734 3.73078 4.56058 3.73078 4.41462C3.73078 3.81132 4.22692 3.32479 4.84213 3.32479C5.45735 3.32479 5.95349 3.81132 5.95349 4.41462C5.95349 5.01792 5.45735 5.50445 4.84213 5.50445C4.69329 5.50445 4.57422 5.62122 4.57422 5.76718V6.55536C4.57422 6.70132 4.69329 6.81808 4.84213 6.81808C4.99097 6.81808 5.11005 6.70132 5.11005 6.55536V6.00071C5.89395 5.87421 6.48932 5.21253 6.48932 4.40489C6.48932 3.5194 5.75503 2.79933 4.84213 2.79933Z" fill="black" />
                                                    <path d="M4.84213 7.98575C5.05037 7.98575 5.21918 7.8202 5.21918 7.61599C5.21918 7.41178 5.05037 7.24623 4.84213 7.24623C4.6339 7.24623 4.46509 7.41178 4.46509 7.61599C4.46509 7.8202 4.6339 7.98575 4.84213 7.98575Z" fill="black" />
                                                </svg>
                                            </BootstrapTooltip>
                                        </Stack>
                                        <Stack spacing={1}>
                                            <ClaimTime claimedAt={claimedAt} claimState={cb} rewardCycle={rewardCycle} UpdateInfo={UpdateAllInfo} />
                                            <Typography variant="span" className="title">
                                                {cb}{" "}{item.tokenId[1]}
                                            </Typography>
                                        </Stack>
                                    </Stack>
                                    <Button
                                        variant="contained"
                                        disabled={cb > 0 ? false : true}
                                        className={cb > 0 ? "" : "disabled"}
                                        onClick={claim}
                                    >
                                        {lang_texts[language][24]}
                                    </Button>
                                </Stack>
                            </Stack>
                        </Collapse>
                    </Box>
                }
            })()}
        </>
    )
}

export default Pool;