import { useState, useContext } from "react";
import { PageContext } from "../../contexts/InsightPageContext";

import makeRequest from "../../utils/makeRequest";
import swal from "../../utils/swal";

//components
import PageTitle from "../_helperComponents/PageTitle";
import InsightCreate from "./utilComponents/InsightCreate";
import InsightPageCreate from "./utilComponents/InsightPageCreate";
import InsightTable from "./utilComponents/InsightTable";
import PrimaryButton from "../PrimaryButton";

export default function Insights() {
    const { setPages, dispatch } = useContext(PageContext);
    const [insightId, setInsightId] = useState(
        sessionStorage.getItem("insightId")
    );
    const [isTable, setIsTable] = useState(true);

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

            setIsTable(true);

            swal("success", response.message);
        } catch (error) {
            swal("error", error.message);
        }
    };

    return (
        <div className="flex flex-col gap-8">
            <div className="flex justify-between items-center">
                <PageTitle name={"Insights"} />
                {isTable ? (
                    <button
                        className="btn-primary"
                        onClick={() => setIsTable(false)}
                    >
                        Create
                    </button>
                ) : null}
            </div>

            {isTable ? (
                <InsightTable
                    setInsightId={setInsightId}
                    setIsTable={setIsTable}
                />
            ) : !insightId && !isTable ? (
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
