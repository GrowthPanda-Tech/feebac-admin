import { useContext } from "react";
import { FilterContext } from "../../../contexts/FilterContext";

import Filter from "./Filter";

export default function Profiles() {
    const { response } = useContext(FilterContext);
    const tertiaryFilters = response?.data[2]?.key;

    return (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {tertiaryFilters?.map((key, index) => (
                <Filter key={index} filter={key} index={index} />
            ))}
        </div>
    );
}
