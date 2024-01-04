import { useState } from "react";
import { useLocation } from "react-router-dom";

import PageTitle from "@helperComps/PageTitle";
import InsightForm from "./utilComponents/InsightForm";

export default function InsightEdit() {
  const location = useLocation();
  const state = location.state;

  const [editData, setEditData] = useState({
    id: state.id,
    is_public: false,
    survey: null,
    image: state.image,
    pages: state.pages,
    remove_page: [],
  });

  return (
    <div className="flex flex-col gap-8">
      <PageTitle name={"Edit Case Study"} />
      <InsightForm data={editData} setter={setEditData} />
    </div>
  );
}
