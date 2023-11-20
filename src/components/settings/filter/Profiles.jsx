import Filter from "./Filter";

export default function Profiles({ tertiaryKeys }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
      {tertiaryKeys.map((filter) => (
        <Filter key={filter.id} dataTypeId={6} filter={filter} />
      ))}
    </div>
  );
}
