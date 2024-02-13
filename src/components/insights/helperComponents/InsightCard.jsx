import { v4 as uuid4 } from "uuid";
import clsx from "clsx";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

//utils
import makeRequest from "@/utils/makeRequest";
import swal from "@/utils/swal";

//components
import { Link } from "react-router-dom";
import { Tooltip } from "@material-tailwind/react";
import ThreeDotMenu from "@utilComps/ThreeDotMenu";

//assets

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
        { id: cardData.id },
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
        { id },
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

  const cardClasses = clsx(
    "flex h-80 w-40 flex-col rounded-2xl border border-black",
    { "disabled-card": !cardData.is_public },
  );

  return (
    <div className="relative">
      {cardData.survey ? (
        <Tooltip
          content={cardData.survey.title}
          animate={{
            mount: { scale: 1, y: 0 },
            unmount: { scale: 0, y: 25 },
          }}
        >
          <Link to={`/survey/details/${cardData.survey.id}`}>
            <i
              className="fa-regular fa-clipboard absolute left-0 top-0 z-10 cursor-pointer p-4 text-2xl"
              style={{ color: "#ffffff" }}
            />
          </Link>
        </Tooltip>
      ) : null}
      <ThreeDotMenu
        handleStatus={handleStatus}
        handleEdit={handleEdit}
        isShowDelete
        handleDelete={handleDelete}
        loading={loading}
      />
      <div className={cardClasses} id={uuid4()} style={cardStyle}>
        <img className="my-auto p-4" src={cardData.pages[0]} />
      </div>
    </div>
  );
}
