//who needs redux

import { createContext, useState, useEffect, useReducer } from "react";

const INIT_STATE = {
    pageType: 1,
    activePage: null,
    data: null,
    index: null,
};

function insightReducer(state, action) {
    switch (action.type) {
        case "LAYOUT": {
            return {
                pageType: action.pageType,
                activePage: null,
                data: null,
                index: null,
            };
        }

        case "PAGE": {
            return {
                ...state,
                pageType: action.pageType,
                activePage: action.activePage,
                data: action.data,
                index: action.index,
            };
        }

        case "RESET": {
            return {
                ...INIT_STATE,
            };
        }

        default: {
            throw new Error(`Unknown action: ${action.type}`);
        }
    }
}

export const PageContext = createContext(null);

export default function PageContextProvider({ children }) {
    const pagesSession = JSON.parse(sessionStorage.getItem("insightPages"));

    const [pages, setPages] = useState(pagesSession ? pagesSession : []);
    const [state, dispatch] = useReducer(insightReducer, INIT_STATE);

    useEffect(() => {
        if (pages.length > 0) {
            sessionStorage.setItem("insightPages", JSON.stringify(pages));
        }
    }, [pages]);

    return (
        <PageContext.Provider value={{ pages, setPages, state, dispatch }}>
            {children}
        </PageContext.Provider>
    );
}
