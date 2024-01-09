import { useContext } from "react";
import { FilterContext } from "@/contexts/FilterContext";

import Filtercard from "@utilComps/FilterCard";

export default function FilterSection({ route, setParamObj, setTarget }) {
  const { fetchedData } = useContext(FilterContext);

  return (
    <div className="flex flex-col gap-8">
      {fetchedData?.data.map(({ id, dataType, key }) => (
        <div key={id} className="flex flex-col gap-4">
          <h1 className="text-xl font-medium">{dataType} filters</h1>
          <div className="flex gap-6">
            {key.map((data) => (
              <Filtercard
                key={data.id}
                data={data}
                route={route}
                setParamObj={setParamObj}
                setTarget={setTarget}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
