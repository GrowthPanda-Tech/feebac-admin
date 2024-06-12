import { useState } from "react";

import PageTitle from "@helperComps/PageTitle";
import InsightForm from "./utilComponents/InsightForm";

export default function InsightCreate() {
  const [createData, setCreateData] = useState({
    survey: "",
    image: null,
    pages: [],
  });

  const [imageHash, setImageHash] = useState([]);

  return (
    <div className="flex flex-col gap-8">
      <PageTitle name={"Create Case Study"} />
      <InsightForm
        data={createData}
        setter={setCreateData}
        hashArr={imageHash}
        hashSetter={setImageHash}
      />
    </div>
  );
}
