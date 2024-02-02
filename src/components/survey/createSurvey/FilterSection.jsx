import { useContext } from "react";
import { FilterContext } from "@/contexts/FilterContext";

import Filtercard from "@utilComps/FilterCard";
import FilterPills from "@helperComps/FilterPills";

export default function FilterSection({ route, target, setTarget }) {
  const { fetchedData } = useContext(FilterContext);

  const targetObjKeys = Object.keys(target).filter(
    (key) => target[key] !== null,
  );

  return (
    <div className="flex flex-col gap-8">
      {fetchedData?.data.map(({ id, dataType, key }) => (
        <div key={id} className="flex flex-col gap-4">
          <h1 className="text-xl font-medium">{dataType} filters</h1>
          <div className="flex flex-wrap gap-4">
            {key.map(({ id, key_name }) => (
              <FilterPills key={id} name={key_name} setTarget={setTarget} />
            ))}
          </div>
          <div className="flex gap-6">
            {key
              .filter((data) => targetObjKeys.includes(data.key_name))
              .map((data) => (
                <Filtercard
                  key={data.id}
                  dataType={dataType}
                  data={data}
                  route={route}
                  setTarget={setTarget}
                />
              ))}
          </div>
        </div>
      ))}
    </div>
  );
}
