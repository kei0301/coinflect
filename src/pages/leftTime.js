import React, { useEffect, useState } from "react";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { toTimes } from "../config/config";

const LeftTime = ({ timeLeft, device, poolState, loading }) => {

    const [leftTime, setLeftTime] = useState({})

    const UpdatingTime = () => {
        setLeftTime(toTimes(timeLeft, (new Date() / 1000)));
    }

    useEffect(() => {
        if (timeLeft && poolState && loading) {
            let timing = setInterval(UpdatingTime, 1000);
            return () => {
                clearInterval(timing);
            }
        } else {
            setLeftTime({})
        }
    }, [timeLeft, poolState, loading])

    return (
        <>
            {(() => {
                if (device === "laptop") {
                    return <Stack direction="row">
                        <Typography variant="span" className="value">
                            {leftTime.days ? leftTime.days : '00'}
                        </Typography>
                        <Typography variant="span" className="value">
                            &nbsp;:&nbsp;
                        </Typography>
                        <Typography variant="span" className="value">
                            {leftTime.hours ? leftTime.hours : '00'}
                        </Typography>
                        <Typography variant="span" className="value">
                            &nbsp;:&nbsp;
                        </Typography>
                        <Typography variant="span" className="value">
                            {leftTime.minutes ? leftTime.minutes : '00'}
                        </Typography>
                        <Typography variant="span" className="value">
                            &nbsp;:&nbsp;
                        </Typography>
                        <Typography variant="span" className="value">
                            {leftTime.seconds ? leftTime.seconds : '00'}
                        </Typography>
                    </Stack>
                } else {
                    return <Stack direction="row">
                        <Typography variant="span" className="value">
                            {leftTime.days ? leftTime.days : '00'}
                        </Typography>
                        <Typography variant="span" className="value">
                            &nbsp;:&nbsp;
                        </Typography>
                        <Typography variant="span" className="value">
                            {leftTime.hours ? leftTime.hours : '00'}
                        </Typography>
                        <Typography variant="span" className="value">
                            &nbsp;:&nbsp;
                        </Typography>
                        <Typography variant="span" className="value">
                            {leftTime.minutes ? leftTime.minutes : '00'}
                        </Typography>
                    </Stack>
                }
            })()}
        </>

    )
}

export default LeftTime;