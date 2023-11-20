import { useState, createContext } from "react";

export const InsightContext = createContext(null);
export const INIT_STATE = {
    caption: "",
    image: null,
    pages: [],
};

export default function InsightContextProvider({ children }) {
    const [insightModel, setInsightModel] = useState(INIT_STATE);
    return (
        <InsightContext.Provider value={{ insightModel, setInsightModel }}>
            {children}
        </InsightContext.Provider>
    );
}
