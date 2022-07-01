import React, { useState, createContext } from 'react'
const localMode = localStorage.mode === "true" ? false : true;
const localCurrency = localStorage.currency ? localStorage.currency : "USD";
const localLanguage = localStorage.language ? localStorage.language : "English";

const ThemeModeContext = createContext({
    isDark: true,
    currency: "USD",
    language: "English",
    setCurrency: () => { },
    setMode: () => { },
    setLanguage: () => { }
})

const ModeProvider = ({ children }) => {

    /*eslint-disable */

    const setMode = () => {
        setIsDark(prevState => {
            localStorage.mode = prevState.isDark;
            return {
                ...prevState,
                isDark: !prevState.isDark
            }
        })
    }

    const setCurrency = (currency) => {
        setIsDark(prevState => {
            localStorage.currency = currency;
            return {
                ...prevState,
                currency: currency
            }
        })
    }

    const setLanguage = (language) => {
        setIsDark(prevState => {
            localStorage.language = language;
            return {
                ...prevState,
                language: language
            }
        })
    }

    const modeState = {
        isDark: localMode,
        currency: localCurrency,
        language: localLanguage,
        setMode,
        setCurrency,
        setLanguage
    }

    const [isDark, setIsDark] = useState(modeState)

    /*eslint-enable */

    return (
        <ThemeModeContext.Provider value={isDark}>
            {children}
        </ThemeModeContext.Provider>
    )
}

export { ThemeModeContext, ModeProvider }