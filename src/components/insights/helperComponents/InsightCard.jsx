import { useState } from "react";

import makeRequest from "../../../utils/makeRequest";
import swal from "../../../utils/swal";

export default function InsightCard({ data }) {
  const [cardData, setCardData] = useState(data);

  const handleStatus = async () => {
    try {
      const response = await makeRequest(
        "insights/toggle-insights-status",
        "PATCH",
        { id: cardData.id }
      );

      if (!response.isSuccess) {
        throw new Error(response.message);
      }

      swal("success", response.message);

      setCardData({ ...cardData, is_public: !cardData.is_public });
    } catch (error) {
      swal("error", error.message);
    }
  };

  return (
    <div
      className={`relative border border-[#00000080] p-4 rounded-2xl w-40 h-80 flex items-center justify-center ${
        !cardData.is_public ? "disabled-card" : ""
      }`}
      style={{
        backgroundImage: `url(${cardData.image})`,
        backgroundSize: "cover",
      }}
    >
      <img src={cardData.pages[0]} />
      <i
        className={`fa-solid ${
          cardData.is_public ? "fa-eye-slash" : "fa-eye"
        } absolute top-0 right-0 p-4 cursor-pointer`}
        style={{
          color: "white",
        }}
        onClick={handleStatus}
      />
    </div>
  );
}
