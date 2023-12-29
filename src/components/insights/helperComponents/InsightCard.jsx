import { useState } from "react";
import { useNavigate } from "react-router-dom";

//utils
import makeRequest from "@/utils/makeRequest";
import swal from "@/utils/swal";

//components
import ThreeDotMenu from "@utilComps/ThreeDotMenu";

export default function InsightCard({ data, cardIndex, setter }) {
  const navigate = useNavigate();

  const [cardData, setCardData] = useState(data);
  const [loading, setLoading] = useState(false);

  //status event handler
  const handleStatus = async () => {
    setLoading(true);

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

      setCardData((prev) => ({ ...prev, is_public: !prev.is_public }));
    } catch (error) {
      swal("error", error.message);
    } finally {
      setLoading(false);
    }
  };

  //edit event? handler
  const handleEdit = () => {
    navigate("edit", { state: data });
  };

  //delete event handler
  const handleDelete = async () => {
    const id = cardData.id;

    setLoading(true);

    try {
      const response = await makeRequest(
        `insights/delete-insights?id=${id}`,
        "DELETE",
        { id }
      );

      if (!response.isSuccess) {
        throw new Error(response.message);
      }

      swal("success", response.message);

      setter((prev) => {
        const newState = { ...prev };
        newState.data.splice(cardIndex, 1);

        return newState;
      });
    } catch (error) {
      swal("error", error.message);
    } finally {
      setLoading(false);
    }
  };

  /* Styles */
  const cardStyle = {
    backgroundImage: `url(${cardData.image})`,
    backgroundSize: "cover",
  };

  const cardClasses = `flex h-80 w-40 flex-col rounded-2xl border border-black ${
    !cardData.is_public ? "disabled-card" : ""
  }`;

  return (
    <div>
      <ThreeDotMenu
        handleStatus={handleStatus}
        handleEdit={handleEdit}
        isShowDelete
        handleDelete={handleDelete}
        loading={loading}
      />
      <div className={cardClasses} style={cardStyle}>
        <img className="my-auto p-4" src={cardData.pages[0]} />
      </div>
    </div>
  );
}
