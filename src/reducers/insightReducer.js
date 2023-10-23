export const INIT_STATE = {
    pageType: 1,
    data: null,
};

export function insightReducer(state, action) {
    switch (action.type) {
        case "LAYOUT": {
            return {
                ...state,
                pageType: action.pageType,
                data: null,
            };
        }

        case "PAGE": {
            return {
                ...state,
                pageType: action.pageType,
                data: action.data,
            };
        }

        default: {
            throw new Error(`Unknown action: ${action.type}`);
        }
    }
}
