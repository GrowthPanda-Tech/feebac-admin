import { useState } from "react";

function FilterOption({ name, index, onFilterClick }) {
    const [clicked, setClicked] = useState(false);

    const handleClick = () => {
        setClicked(!clicked);
        onFilterClick(index, clicked);
    }

    return (
        <div
            className={`capitalize p-2 px-4 bg-${clicked ? 'secondary' : 'white'} ${clicked && 'text-white'} w-fit rounded-xl font-medium cursor-pointer`}
            onClick={handleClick}>
            {name}
        </div>
    );
}

function FilterSubSection({ filterName, filterData }) {
    const [filterValues, setFilterValues] = useState({});

    const handleOptionClick = (index, clicked) => {
        setFilterValues(prevOptions => ({
            ...prevOptions,
            [index]: !clicked
        }));
    };

    return (
        <div className="flex flex-col gap-4">
            <h1 className="heading mb-0"> {filterName} Filters </h1>
            <div className="flex gap-4">
                {
                    filterData.map((data, index) => (
                        <FilterOption 
                            key={index}
                            name={data.key_name}
                            index={index}
                            onFilterClick={handleOptionClick}
                        />
                    ))
                }
            </div>

            {/* Render input fields based on selected options */}
            {
                filterData.map((data, index) => (
                    filterValues[index] && (
                        <input
                            key={index}
                            placeholder={`Enter ${data.key_name}`}
                            className="input-primary"
                        />
                    )
                ))
            }
        </div>
    );
}

export default function Filters({filters}) {
    return (
        <div className="flex flex-col gap-8">
            {
                Object.keys(filters).map((key) => (
                    <FilterSubSection
                        key={key} 
                        filterName={key}
                        filterData={filters[key]}
                    />
                ))
            }
        </div>
    );
}
