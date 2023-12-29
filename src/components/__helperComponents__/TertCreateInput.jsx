export default function TertCreateInput({
  type = "text",
  name,
  value,
  placeholder,
  handleChange,
}) {
  return (
    <input
      type={type}
      name={name}
      value={value}
      placeholder={placeholder}
      onChange={handleChange}
      className="w-full rounded-md bg-background px-8 py-5 disabled:cursor-not-allowed"
    />
  );
}
