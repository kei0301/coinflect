import React, { useEffect, useState } from "react";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { claimTime } from "../config/config";

const ClaimTime = ({ claimState, claimedAt, rewardCycle, UpdateInfo }) => {

    const [claimable, setClaimable] = useState({})

    const ClaimableTiming = () => {
        let cTime = claimTime(claimedAt, rewardCycle);
        if (!cTime) {
            setClaimable({})
            return UpdateInfo();
        }

        setClaimable(cTime)
    }

    useEffect(() => {
        let timing;
        if (Number(claimState) > 0 && Number(claimedAt)) {
            timing = setInterval(ClaimableTiming, 1000);
        }
        return () => {
            clearInterval(timing);
        }
    }, [claimedAt, claimState])

    return (
        <Stack direction="row" spacing={1}>
            <Stack>
                <Typography variant="span" className="title">
                    {claimable.hours ? claimable.hours : '00'} hrs
                </Typography>
            </Stack>
            <Stack>
                <Typography variant="span" className="title">
                    {claimable.minutes ? claimable.minutes : '00'} min
                </Typography>
            </Stack>
            <Stack>
                <Typography variant="span" className="title">
                    {claimable.seconds ? claimable.seconds : '00'} sec
                </Typography>
            </Stack>
        </Stack>
    )
}

export default ClaimTime;