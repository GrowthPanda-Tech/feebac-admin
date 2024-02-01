import { useFilterContext } from "@/contexts/FilterContext";
import { searchFilterbyKeyName } from "@/utils/searchFilterbyKeyName";
import { searchLocationbyId } from "@/utils/searchLocationbyId";

const LOCATION_KEYS = ["country", "state", "city"];

export default function SelectedFilterSection({ target }) {
  const { fetchedData } = useFilterContext();
  const data = fetchedData?.data[0]?.key;

  const sections = Object.keys(target);

  return (
    <div className="flex w-2/5 flex-col gap-8 rounded-xl bg-[#E7E7E7] px-6 py-8">
      {sections.map((section, index) => (
        <div key={index} className="flex flex-col gap-2">
          <span className="text-lg capitalize text-[#000000BF]">{section}</span>
          <div className="flex flex-wrap gap-4">
            {target[section].map((value, index) => {
              //lord forgive me for what i'm about to do
              let displayValue = value;
              if (LOCATION_KEYS.includes(section)) {
                const keyIdx = searchFilterbyKeyName(data, section);
                displayValue = searchLocationbyId(
                  data[keyIdx].options,
                  parseInt(value),
                );
              }
              return (
                <span key={index} className="rounded-xl bg-white px-4 py-1">
                  {displayValue}
                </span>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
