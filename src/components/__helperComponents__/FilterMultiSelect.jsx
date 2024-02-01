import { useState, useCallback } from "react";
import { searchObjects } from "@/utils/searchObjects";

import FilterSwitch from "../__utilComponents__/FilterSwitch";

const LOCATION_KEYS = ["country", "state", "city"];

export default function FilterMultiSelect({
  keyName,
  options,
  searchTerm,
  setParamObj,
  setTarget,
}) {
  const [checked, setChecked] = useState([]);
  const filteredResults = searchObjects(options, searchTerm);

  const handleClick = useCallback(
    (uuid, checked, value) => {
      //set checked array state
      setChecked((prev) => {
        if (!checked) return prev.filter((id) => id !== uuid);
        return [...prev, uuid];
      });

      //set target object data (for targeting duh...)
      setTarget((prev) => {
        if (!checked) {
          const update = prev
            ? prev[keyName].filter((item) => {
                const itemTrimmed = item.startsWith("!")
                  ? item.substring(1)
                  : item;
                return itemTrimmed !== value;
              })
            : null;

          const updatedTarget = { ...prev, [keyName]: update };
          return updatedTarget;
        }

        return {
          ...prev,
          [keyName]: prev[keyName] ? [...prev[keyName], value] : [value],
        };
      });

      //set query param (for location data)
      setParamObj((prev) => {
        const curr = prev[keyName];

        if (!checked) {
          const update = curr
            ? curr
                .split(",")
                .filter((item) => item !== value)
                .join(",") || null
            : null;

          return { ...prev, [keyName]: update };
        }

        return { ...prev, [keyName]: curr ? `${curr},${value}` : value };
      });
    },
    [keyName, setTarget, setParamObj],
  );

  return (
    <div className="flex flex-col gap-3">
      {filteredResults.map(({ id, name }) => (
        <div key={id} className="flex justify-between">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              value={LOCATION_KEYS.includes(keyName) ? id : name}
              className="w-4"
              onChange={(e) =>
                handleClick(id, e.target.checked, e.target.value)
              }
              checked={checked.includes(id)}
            />
            <span>{name}</span>
          </label>
          {checked.includes(id) ? (
            <FilterSwitch
              keyName={keyName}
              filterName={name}
              setTarget={setTarget}
            />
          ) : null}
        </div>
      ))}
    </div>
  );
}
