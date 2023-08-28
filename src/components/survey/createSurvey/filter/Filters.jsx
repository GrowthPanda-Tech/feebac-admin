import FilterSubSection from "./FilterSubSection";

export default function Filters({ filters }) {
    return (
        <div className="flex flex-col gap-8">
            {Object.keys(filters).map((key) => (
                <FilterSubSection
                    key={key}
                    filterName={key}
                    filterData={filters[key]}
                />
            ))}
        </div>
    );
}
