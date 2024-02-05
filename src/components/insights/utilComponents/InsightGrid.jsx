import useFetch from "@/hooks/useFetch";

import LoadingSpinner from "@helperComps/LoadingSpinner";
import InsightCard from "../helperComponents/InsightCard";

export default function InsightGrid() {
  const { loading, fetchedData, setFetchedData } = useFetch(
    "insights/get-all-insights?count=&page=1",
  );

  if (loading) return <LoadingSpinner />;

  return (
    <div className="flex flex-wrap gap-8">
      {fetchedData?.data.map((insight, idx) => (
        <InsightCard
          key={insight.id}
          data={insight}
          cardIndex={idx}
          setter={setFetchedData}
        />
      ))}
    </div>
  );
}
