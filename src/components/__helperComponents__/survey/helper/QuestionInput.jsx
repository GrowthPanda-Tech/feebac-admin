export default function QuestionInput(props) {
  const { type = "text", name, value, setState } = props;

  return (
    <input
      type={type}
      name={name}
      value={value}
      onChange={setState}
      className="w-full rounded-md bg-[#EFEFEF] px-8 py-5"
      required
    />
  );
}
