import { useState, useContext } from "react";
import { PageContext } from "../../contexts/InsightPageContext";

import makeRequest from "../../utils/makeRequest";

//components
import PageTitle from "../_helperComponents/PageTitle";
import InsightCreate from "./utilComponents/InsightCreate";
import InsightPageCreate from "./utilComponents/InsightPageCreate";

export default function Insights() {
    const { setPages, dispatch } = useContext(PageContext);
    const [insightId, setInsightId] = useState(
        sessionStorage.getItem("insightId")
    );

    const handleSubmit = async () => {
        try {
            const response = await makeRequest(
                "insights/toggle-insights-status",
                "PATCH",
                { id: insightId }
            );

            if (!response.isSuccess) {
                throw new Error(response.message);
            }

            sessionStorage.clear();
            dispatch({ type: "RESET" });

            setInsightId(null);
            setPages([]);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="flex flex-col gap-8">
            <PageTitle name={"Insights"} />

            {!insightId ? (
                <InsightCreate setInsightId={setInsightId} />
            ) : (
                <>
                    <InsightPageCreate />
                    <button onClick={handleSubmit}>Submit Insight</button>
                </>
            )}
        </div>
    );
}
