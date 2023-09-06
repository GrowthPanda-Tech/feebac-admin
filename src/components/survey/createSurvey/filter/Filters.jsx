import FilterSubSection from "./FilterSubSection";

export default function Filters({ filters, profileData, setProfileData }) {
    return (
        <div className="flex flex-col gap-8">
            {filters.map((filter, key) => (
                <FilterSubSection
                    key={key}
                    filterName={key}
                    filterData={filter}
                    profileData={profileData}
                    setProfileData={setProfileData}
                />
            ))}
        </div>
    );
}
