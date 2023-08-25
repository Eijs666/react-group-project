import React, { createContext, useContext, useState } from 'react';

//New context api to act as a global data across all components
const TranslationsContext = createContext();

//Manage child components - 10 last translations if profile page is cleared
export const TranslationsProvider = ({ children }) => {
    const [lastTenTranslations, setLastTenTranslations] = useState([]);
    const [isCleared, setIsCleared] = useState(false);

    const clearLastTenTranslations = () => setLastTenTranslations([]);

    return (
        <TranslationsContext.Provider value={{ lastTenTranslations, setLastTenTranslations, isCleared, setIsCleared }}>
            {children}
        </TranslationsContext.Provider>
    );
};
//Access to the overall component
export const useTranslations = () => useContext(TranslationsContext);
