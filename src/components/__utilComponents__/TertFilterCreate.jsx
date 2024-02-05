import clsx from "clsx";

import { useState, useContext } from "react";
import { FilterContext } from "@/contexts/FilterContext";

import TertCreateInput from "@helperComps/TertCreateInput";

import makeRequest from "@/utils/makeRequest";
import swal from "@/utils/swal";

const INIT_STATE = {
  dataType: 3,
  name: "",
  isSelect: true,
  options: [],
};

export default function TertFilterCreate({
  stopPropgation,
  setIsFilterCreate,
  setFilters,
}) {
  const [tertFilterState, setTertFilterState] = useState(
    structuredClone(INIT_STATE),
  );
  const [loading, setLoading] = useState(false);

  const { fetchedData, setFetchedData } = useContext(FilterContext);

  const handleSubmit = async () => {
    //remove empty strings from the options array
    const optionsArr = [...tertFilterState.options];
    const optionsTrimmed = optionsArr.filter((options) => options !== "");

    const requestObj = { ...tertFilterState, options: optionsTrimmed };

    setLoading(true);

    try {
      const response = await makeRequest(
        "config/add-profile-key-value",
        "POST",
        requestObj,
      );

      if (!response.isSuccess) throw new Error(response.message);

      /* State management */

      //local filter state
      if (setFilters) setFilters((prev) => [...prev, response.data]);

      //context state update
      const spread = { ...fetchedData };
      spread.data[2].key.push(response.data);
      setFetchedData(spread);

      //state reset
      setTertFilterState(structuredClone(INIT_STATE));
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
      className="flex aspect-square h-[40rem] flex-col gap-7 rounded-xl bg-white p-12 shadow-md"
    >
      <div className="flex justify-between text-xl">
        <span className="font-medium"> Create Filter </span>
        <button
          type="submit"
          onClick={handleSubmit}
          disabled={loading || tertFilterState.options.length === 0}
          className={clsx(
            "font-semibold",
            "transition",
            "enabled:hover:text-black",
            "disabled:opacity-50",
            loading ? "text-tertiary" : "text-[#EA525F]",
          )}
        >
          {loading ? "Adding..." : "Done"}
        </button>
      </div>

      <div className="flex flex-col gap-5 overflow-y-scroll p-1">
        <TertCreateInput
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
              <TertCreateInput
                value={option}
                handleChange={(e) => {
                  const spread = { ...tertFilterState };
                  spread.options[idx] = e.target.value;
                  setTertFilterState(spread);
                }}
                placeholder={"Enter Keyword Name"}
              />
              <button
                type="button"
                onClick={() => {
                  const spread = { ...tertFilterState };
                  spread.options.splice(idx, 1);
                  setTertFilterState(spread);
                }}
              >
                <i className="fa-regular fa-trash-can text-xl" />
              </button>
            </div>
          ))}
        </div>
      </div>

      <button
        type="button"
        onClick={() => {
          const spread = { ...tertFilterState };
          spread.options.push("");
          setTertFilterState(spread);
        }}
        className="w-fit rounded-xl border-2 border-[#EA8552] px-6 py-3 font-medium text-[#EA8552] transition hover:bg-[#EA8552] hover:text-white"
      >
        Add keywords
      </button>
    </div>
  );
}
