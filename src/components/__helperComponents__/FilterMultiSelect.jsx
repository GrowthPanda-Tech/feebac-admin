import { useState, useCallback } from "react";
import { searchObjects } from "@/utils/searchObjects";

export default function FilterMultiSelect({
  keyName,
  options,
  searchTerm,
  setParamObj,
}) {
  const [checked, setChecked] = useState([]);
  const filteredResults = searchObjects(options, searchTerm);

  const handleClick = useCallback(
    (uuid, checked, value) => {
      setChecked((prev) => {
        if (!checked) return prev.filter((id) => id !== uuid);
        return [...prev, uuid];
      });

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
    [keyName, setParamObj],
  );

  return (
    <div className="flex flex-col gap-3">
      {filteredResults.map(({ id, name }) => (
        <label key={id} className="flex items-center gap-2">
          <input
            type="checkbox"
            value={id}
            className="w-4"
            onChange={(e) => handleClick(id, e.target.checked, e.target.value)}
            checked={checked.includes(id)}
          />
          <span>{name}</span>
        </label>
      ))}
    </div>
  );
}
