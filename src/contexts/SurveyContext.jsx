import { createContext, useState } from "react";

export const SurveyContext = createContext(null);

export default function SurveyContextProvider({ children }) {
    const [surveyData, setSurveyData] = useState({ category: 1, target: {} });

    return (
        <SurveyContext.Provider value={{ surveyData, setSurveyData }}>
            {children}
        </SurveyContext.Provider>
    );
}
