import { Link } from "react-router-dom";
import PageTitle from "../PageTitle";
import InsightGrid from "./utilComponents/InsightGrid";

export default function Insights() {
    return (
        <div className="flex flex-col gap-6">
            <div className="flex justify-between items-center">
                <PageTitle name={"Insights"} />
                <Link className="btn-primary" to={"create"}>
                    Create Insight
                </Link>
            </div>

            <InsightGrid />
        </div>
    );
}
