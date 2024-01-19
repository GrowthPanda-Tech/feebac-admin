import { useState } from "react";
import { useFilterContext } from "@/contexts/FilterContext";

import swal from "@/utils/swal";
import makeRequest from "@/utils/makeRequest";

function Label({ name, children }) {
  return (
    <label className="flex flex-col">
      <span className="mb-2 text-lg font-medium"> {name} </span>
      {children}
    </label>
  );
}

export default function FilterCreate({
  filterVals,
  setFilterVals,
  setIsShowFilterCreate,
}) {
  const { setFetchedData } = useFilterContext();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    setLoading(true);

    try {
      const response = await makeRequest(
        "config/add-profile-key-value",
        "POST",
        filterVals,
      );

      if (!response.isSuccess) {
        throw new Error(response.message);
      }

      setFetchedData((prev) => {
        const currTert = [...prev.data[2].key];
        const updatedTert = [...currTert, response.data];

        return {
          ...prev,
          data: [
            ...prev.data.slice(0, 2),
            {
              ...prev.data[2],
              key: updatedTert,
            },
          ],
        };
      });

      setIsShowFilterCreate(false);
    } catch (error) {
      swal("error", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex w-[60rem] flex-col gap-6 rounded-md bg-white p-10">
        <Label name={"Filter Name"}>
          <input
            required
            name="name"
            className="input-settings"
            onChange={(event) => {
              const enteredVal = event.target.value.trim();

              if (enteredVal === "") {
                event.target.value = "";
              }

              setFilterVals({
                ...filterVals,
                name: enteredVal,
              });
            }}
          />
        </Label>

        <div className="flex gap-4">
          <button
            type="submit"
            className="btn-primary disabled:btn-secondary"
            disabled={loading}
          >
            {loading ? "Adding..." : "Add"}
          </button>
          <button
            type="button"
            className="btn-secondary"
            onClick={() => setIsShowFilterCreate(false)}
            disabled={loading}
          >
            Cancel
          </button>
        </div>
      </div>
    </form>
  );
}
