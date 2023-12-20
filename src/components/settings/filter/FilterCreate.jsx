import swal from "../../../utils/swal";
import makeRequest from "../../../utils/makeRequest";

function Label({ name, children }) {
  return (
    <label className="flex flex-col">
      <span className="font-medium text-lg mb-2"> {name} </span>
      {children}
    </label>
  );
}

export default function FilterCreate({
  filterVals,
  setFilterVals,
  setTertiaryKeys,
  setIsShowFilterCreate,
}) {
  const handleSubmit = async () => {
    try {
      const response = await makeRequest(
        "config/add-profile-key-value",
        "POST",
        filterVals
      );

      if (!response.isSuccess) {
        throw new Error(response.message);
      }

      setIsShowFilterCreate(false);
      setTertiaryKeys((prev) => [...prev, response.data]);
    } catch (error) {
      swal("error", error.message);
    }
  };

  return (
    <div className="p-10 bg-white rounded-md flex flex-col gap-6">
      <Label name={"Filter Name"}>
        <input
          name="name"
          className="input-settings"
          onChange={(event) =>
            setFilterVals({
              ...filterVals,
              name: event.target.value,
            })
          }
        />
      </Label>

      <div className="flex gap-4">
        <button className="btn-primary" onClick={handleSubmit}>
          Add
        </button>
        <button
          className="btn-secondary"
          onClick={() => setIsShowFilterCreate(false)}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
