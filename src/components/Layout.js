import React from "react";
import Header from "./Header";
import useStyles from "../assets/constants/styles";

const Layout = ({ children }) => {
    const styles = useStyles()

    return (
        <div className={styles.AppContainer}>
            <Header />
            {children}
        </div>
    )
}

export default Layout;