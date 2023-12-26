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
      className="w-full bg-background py-5 px-8 rounded-md disabled:cursor-not-allowed"
    />
  );
}
