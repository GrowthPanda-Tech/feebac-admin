export default function FilterSearchBar({ value, setter }) {
  return (
    <input
      type="text"
      name="search"
      placeholder="Search"
      className="rounded-2xl bg-[#F1F1F1] px-6 py-2"
      value={value}
      onChange={(e) => setter(e.target.value)}
    />
  );
}
