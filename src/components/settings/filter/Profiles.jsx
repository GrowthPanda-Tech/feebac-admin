import Filter from "./Filter";

export default function Profiles({ tertiaryKeys }) {
  return (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
      {tertiaryKeys.map((filter) => (
        <Filter key={filter.id} dataTypeId={6} filter={filter} />
      ))}
    </div>
  );
}
