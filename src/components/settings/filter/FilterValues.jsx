import { useState } from "react";
import makeRequest from "../../../utils/makeRequest";

export default function FilterValues({
  dataTypeId,
  filterId,
  isSelect,
  options,
  setOptions,
}) {
  const [addingOption, setAddingOption] = useState(false);
  const [newOption, setNewOption] = useState("");

  const handleOptionRemove = async (index) => {
    const response = await makeRequest(
      `config/delete-profile-key-option?dataType=3&key=${filterId}&option=${options[index]}`,
      "DELETE",
    );
    response.isSuccess && setOptions(response.data.options);
  };

  const handleOptionAdd = async () => {
    const request = {
      dataType: 3,
      key: filterId,
      newOptions: [newOption],
    };

    const response = await makeRequest(
      "config/add-profile-options",
      "POST",
      request,
    );

    setOptions(response.data);
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
    <>
      {isSelect ? (
        <div className="flex flex-col gap-4">
          {options.map((option, index) => (
            <div key={index} className="flex items-center justify-between">
              <span className="font-semibold text-accent">{option}</span>
              <i
                className="fa-solid fa-xmark cursor-pointer"
                onClick={() => handleOptionRemove(index)}
              ></i>
            </div>
          ))}

          {addingOption ? (
            <input
              autoFocus
              className="input-settings"
              placeholder="Add a value or press Esc"
              type="text"
              value={newOption}
              onChange={(e) => setNewOption(e.target.value)}
              onKeyUp={(event) => handleKey(event)}
            />
          ) : (
            <div
              className="flex cursor-pointer items-center"
              onClick={() => setAddingOption(true)}
            >
              <i className="fa-solid fa-plus mr-4"></i>
              <span> Add More Values </span>
            </div>
          )}
        </div>
      ) : (
        <div className="flex justify-evenly">
          <div>{options[0]}</div>
          <div>{options[1]}</div>
        </div>
      )}
    </>
  );
}
