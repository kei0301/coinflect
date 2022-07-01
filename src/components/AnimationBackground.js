import React from "react";
import Stack from "@mui/material/Stack";
import useStyles from "../assets/constants/styles";

const AnimationBG = () => {
    const styles = useStyles()

    return (
        <div className={styles.AnimationBG}>
            <Stack className="circle-1"></Stack>
            <Stack className="circle-2"></Stack>
            <Stack className="circle-3"></Stack>
            <Stack className="circle-4"></Stack>
            <Stack className="circle-5"></Stack>
            <Stack className="circle-6"></Stack>
        </div>
    )
}

export default AnimationBG;