import dateParser from "../../../utils/dateParser";

export default function TableDateTime({ date }) {
  const local = dateParser(date);

  const localDate = local.split(",")[0];
  const localTime = local.split(",")[1];

  return (
    <div className="flex flex-col gap-2">
      <span> {localDate} </span>
      <span className="text-sm"> {localTime} </span>
    </div>
  );
}
