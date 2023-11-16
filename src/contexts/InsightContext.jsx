import { useState, createContext } from "react";

export const InsightContext = createContext(null);

export default function InsightContextProvider({ children }) {
    const [insightModel, setInsightModel] = useState({
        image: null,
        pages: [],
    });

    return (
        <InsightContext.Provider value={{ insightModel, setInsightModel }}>
            {children}
        </InsightContext.Provider>
    );
}
