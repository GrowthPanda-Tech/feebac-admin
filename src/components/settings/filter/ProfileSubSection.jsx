import Filter from "./Filter";

export default function ProfileSubSection({ type, filters }) {
    return (
        <div className="mb-8">
            <h1 className="heading text-xl font-medium">{type} Filters</h1>

            <div className="grid grid-cols-4 gap-8">
                {filters.map((filter, index) => (
                    <Filter key={index} filter={filter} />
                ))}
            </div>
        </div>
    );
}
