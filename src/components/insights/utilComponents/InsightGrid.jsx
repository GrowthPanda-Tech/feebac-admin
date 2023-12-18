import useFetch from "../../../hooks/useFetch";

import LoadingSpinner from "../../__helperComponents__/LoadingSpinner";
import InsightCard from "../helperComponents/InsightCard";

export default function InsightGrid() {
  const { loading, fetchedData } = useFetch(
    "insights/get-all-insights?count=&page=1"
  );

  if (loading) {
    return <LoadingSpinner />;
  }

  //TODO: handle error

  return (
    <div className="flex gap-8 flex-wrap">
      {fetchedData?.data.map((insight) => (
        <InsightCard key={insight.id} data={insight} />
      ))}
    </div>
  );
}
