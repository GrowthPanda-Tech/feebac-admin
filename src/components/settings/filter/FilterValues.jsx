import { useState } from "react";
import { useFilterContext } from "@/contexts/FilterContext";

import makeRequest from "@/utils/makeRequest";
import swal from "@/utils/swal";

export default function FilterValues({ id, options, filterIdx }) {
  const [addingOption, setAddingOption] = useState(false);
  const [newOptions, setNewOption] = useState("");

  const { fetchedData, setFetchedData } = useFilterContext();

  const handleOptionRemove = async (index) => {
    const option = options[index];
    const params = new URLSearchParams({ id, option });
    const url = `config/delete-profile-key-option?${params}`;

    const initState = structuredClone(fetchedData);

    try {
      //optimistically update state
      setFetchedData((prev) => {
        const curr = { ...prev };
        const currArr = [...curr.data[2].key[filterIdx].options];

        if (index >= 0 && index < currArr.length) {
          currArr.splice(index, 1);
        }

        curr.data[2].key[filterIdx].options = currArr;
        return curr;
      });

      const response = await makeRequest(url, "DELETE");
      if (!response.isSuccess) throw new Error(response.message);
    } catch (error) {
      setFetchedData(initState);
      swal("error", error.message);
    }
  };

  const handleOptionAdd = async () => {
    const optionsArr = newOptions.split(",");
    const request = { id, newOptions: optionsArr };

    const initState = structuredClone(fetchedData);

    try {
      //optimistically update state
      setFetchedData((prev) => {
        const curr = { ...prev };
        const currArr = [...curr.data[2].key[filterIdx].options, ...optionsArr];
        curr.data[2].key[filterIdx].options = currArr;

        return curr;
      });

      const response = await makeRequest(
        "config/add-profile-options",
        "POST",
        request,
      );
      if (!response.isSuccess) throw new Error(response.message);
    } catch (error) {
      setFetchedData(initState);
      console.error(error);
    }
  };

  const handleKey = (event) => {
    if (event.key === "Enter") {
      handleOptionAdd();
      setNewOption("");
    } else if (event.key === "Escape") {
      setAddingOption(false);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      {options.map((option, index) => (
        <div key={index} className="flex items-center justify-between">
          <span className="font-semibold text-accent">{option}</span>
          <i
            className="fa-solid fa-xmark cursor-pointer"
            onClick={() => handleOptionRemove(index)}
          />
        </div>
      ))}

      {addingOption ? (
        <input
          autoFocus
          className="rounded-md border border-[#C9CED6] bg-white px-6 py-4"
          placeholder="Add values or press Esc"
          type="text"
          value={newOptions}
          onChange={(e) => setNewOption(e.target.value)}
          onKeyUp={(event) => handleKey(event)}
        />
      ) : (
        <div
          className="flex cursor-pointer items-center"
          onClick={() => setAddingOption(true)}
        >
          <i className="fa-solid fa-plus mr-4" />
          <span> Add More Values </span>
        </div>
      )}
    </div>
  );
}
