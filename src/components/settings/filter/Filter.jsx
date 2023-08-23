import { useState } from "react";
import FilterValues from "./FilterValues";
import FilterSlider from "./FilterSlider";

export default function Filter({filter}) {
    const [isExpand, setIsExpand] = useState(false);

    return (
        <div
            className='h-fit bg-white py-6 px-8 flex gap-4 flex-col rounded-md' >
            <div className="flex items-center justify-between">
                <span className="font-semibold text-lg capitalize"> {filter.key_name} </span>
                <i
                    onClick={() => setIsExpand(!isExpand)}
                    className={`fa-solid fa-angles-${!isExpand ? 'down' : 'up'} cursor-pointer`}>
                </i>
            </div>

            {
                isExpand && 
                <>
                    {filter.is_select ? <FilterValues filter={filter} /> : <FilterSlider filter={filter} />}
                </>
            }
        </div>
    );
}

