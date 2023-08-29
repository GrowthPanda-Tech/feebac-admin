import FilterSubSection from "./FilterSubSection";

export default function Filters({ filters }) {
    return (
        <div className="flex flex-col gap-8">
            {filters.map((filter, key) => {
                console.log(filter);
                return (
                    <FilterSubSection
                        key={key}
                        filterName={key}
                        filterData={filter}
                    />
                );
            })}
        </div>
    );
}
