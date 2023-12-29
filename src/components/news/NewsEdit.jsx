import { useLocation } from "react-router-dom";

import NewsForm from "./NewsForm";
import PageTitle from "@helperComps/PageTitle";

export default function NewsEdit() {
  const location = useLocation();
  const { from } = location.state;

  return (
    <div className="flex flex-col gap-8">
      <PageTitle name={"Edit News"} />
      <NewsForm newsData={from} />
    </div>
  );
}
