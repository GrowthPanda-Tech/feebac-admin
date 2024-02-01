import { useState, useContext } from "react";
import { FilterContext } from "@/contexts/FilterContext";

//utils
import makeRequest from "@/utils/makeRequest";
import swal from "@/utils/swal";

//components
import FilterSearchBar from "@helperComps/FilterSearchBar";
import FilterMultiSelect from "@helperComps/FilterMultiSelect";
import FilterRange from "@helperComps/FilterRange";

const LOCATION_KEYS = ["country", "state", "city"];

export default function Filtercard({
  data,
  dataType,
  route,
  setParamObj,
  setTarget,
}) {
  const { key_name, is_select, options } = data;
  const { setFetchedData } = useContext(FilterContext);

  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLocationFetch = async () => {
    setLoading(true);

    try {
      const response = await makeRequest(route, "GET");
      if (!response.isSuccess) throw new Error(response.message);

      //manage state
      setFetchedData((prev) => {
        const updatedData = prev.data.map((item) => {
          if (
            item.dataType === "Primary" &&
            response.data[0].key[0].key_name !== "country"
          ) {
            const updatedKey = [item.key[0], ...response.data[0].key];

            return {
              ...item,
              key: updatedKey,
            };
          }

          return item;
        });

        return {
          ...prev,
          data: updatedData,
        };
      });
    } catch (error) {
      swal("error", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="no-scrollbar flex aspect-square w-80 flex-col gap-4 overflow-y-scroll rounded-lg bg-white p-8 shadow-lg">
      <div className="flex justify-between font-medium">
        <span className="capitalize">{key_name}</span>
        {LOCATION_KEYS.includes(key_name) ? (
          <button
            type="button"
            className="text-secondary transition hover:text-black disabled:text-black disabled:opacity-50"
            onClick={handleLocationFetch}
            disabled={loading}
          >
            {loading ? "Fetching..." : "Done"}
          </button>
        ) : null}
      </div>
      {is_select ? (
        <>
          <FilterSearchBar value={searchTerm} setter={setSearchTerm} />
          <FilterMultiSelect
            dataType={dataType}
            keyName={key_name}
            options={options}
            searchTerm={searchTerm}
            setParamObj={setParamObj}
            setTarget={setTarget}
          />
        </>
      ) : (
        <FilterRange
          keyName={key_name}
          options={options}
          setTarget={setTarget}
        />
      )}
    </div>
  );
}
