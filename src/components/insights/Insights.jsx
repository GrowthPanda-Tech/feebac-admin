import { Link } from "react-router-dom";

import PageTitle from "@helperComps/PageTitle";
import InsightGrid from "./utilComponents/InsightGrid";

export default function Insights() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <PageTitle name={"Case Studies"} />
        <Link className="btn-primary" to={"create"}>
          <i className="fa-solid fa-plus" />
          Create
        </Link>
      </div>

      <InsightGrid />
    </div>
  );
}
