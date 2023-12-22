import { useState } from "react";

import makeRequest from "@/utils/makeRequest";
import swal from "@/utils/swal";
import { useContext } from "react";
import { FilterContext } from "@/contexts/FilterContext";

//TODO: Move this to helper
function Input({ type = "text", name, value, placeholder, handleChange }) {
  return (
    <input
      type={type}
      name={name}
      value={value}
      placeholder={placeholder}
      onChange={handleChange}
      className="w-full bg-background py-5 px-8 rounded-md disabled:cursor-not-allowed"
    />
  );
}

const INIT_STATE = {
  dataType: 3,
  name: "",
  isSelect: true,
  options: null,
};

export default function TertFilterCreate({
  stopPropgation,
  setIsFilterCreate,
  setFilters,
}) {
  const [tertFilterState, setTertFilterState] = useState(INIT_STATE);
  const [loading, setLoading] = useState(false);

  const { fetchedData, setFetchedData } = useContext(FilterContext);

  const handleChange = (e, idx) => {
    const spread = { ...tertFilterState };
    spread.options[idx] = e.target.value;

    setTertFilterState(spread);
  };

  const handleClick = () => {
    const spread = { ...tertFilterState };

    if (spread.options) {
      spread.options.push("");
    } else {
      spread.options = [""];
    }

    setTertFilterState(spread);
  };

  const handleSubmit = async () => {
    setLoading(true);

    try {
      const response = await makeRequest(
        "config/add-profile-key-value",
        "POST",
        tertFilterState
      );
      if (!response.isSuccess) throw new Error(response.message);

      /* State management */

      //local filter state
      setFilters((prev) => [...prev, response.data]);

      //context state update
      const spread = { ...fetchedData };
      spread.data[2].key.push(response.data);
      setFetchedData(spread);

      //state reset
      setTertFilterState(INIT_STATE);
      setIsFilterCreate(false);

      swal("success", response.message);
    } catch (error) {
      swal("error", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      onClick={stopPropgation}
      className="h-[40rem] p-12 bg-white aspect-square shadow-md rounded-xl flex flex-col gap-7"
    >
      <div className="flex justify-between text-xl">
        <span className="font-medium"> Create Filter </span>
        <button
          onClick={handleSubmit}
          disabled={loading}
          className={`${
            loading ? "text-tertiary" : "text-[#EA525F]"
          } hover:text-black transition font-semibold`}
        >
          {loading ? "Adding..." : "Done"}
        </button>
      </div>

      <div className="flex flex-col gap-5 p-1 overflow-y-scroll">
        <Input
          name={"name"}
          value={tertFilterState.name}
          handleChange={(e) =>
            setTertFilterState({ ...tertFilterState, name: e.target.value })
          }
          placeholder={"Enter Tertiary Filter Name"}
        />

        <div className="flex flex-col gap-5">
          {tertFilterState.options?.map((option, idx) => (
            <div key={idx} className="flex items-center gap-4">
              <span> {idx + 1}. </span>
              <Input
                value={option}
                handleChange={(e) => handleChange(e, idx)}
                placeholder={"Enter Keyword Name"}
              />
            </div>
          ))}
        </div>
      </div>

      <button
        onClick={handleClick}
        className="border-2 border-[#EA8552] text-[#EA8552] hover:bg-[#EA8552] hover:text-white transition font-medium w-fit py-3 px-6 rounded-xl"
      >
        Add keywords
      </button>
    </div>
  );
}
