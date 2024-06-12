import { useState } from "react";
import { useLocation } from "react-router-dom";
import { initWithUUID } from "@/utils/initWithUUID";

import PageTitle from "@helperComps/PageTitle";
import InsightForm from "./utilComponents/InsightForm";

export default function InsightEdit() {
  const location = useLocation();
  const state = location.state;

  const [editData, setEditData] = useState({
    id: state.id,
    survey: state.survey ? state.survey.id : "",
    image: state.image,
    pages: initWithUUID(state.pages),
    is_public: false,
    remove_page: [],
  });

  const [imageHash, setImageHash] = useState([]);

  return (
    <div className="flex flex-col gap-8">
      <PageTitle name={"Edit Case Study"} />
      <InsightForm
        data={editData}
        setter={setEditData}
        hashArr={imageHash}
        hashSetter={setImageHash}
      />
    </div>
  );
}
