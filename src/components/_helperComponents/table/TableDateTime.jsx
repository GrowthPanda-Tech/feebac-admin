export default function TableDateTime({ date }) {
  const dateObj = new Date(date);
  const localeString = dateObj.toLocaleString("en-GB");

  const dateLocale = localeString.split(",")[0];
  const timeLocale = localeString.split(",")[1];

  return (
    <div className="flex flex-col gap-2">
      <span> {dateLocale} </span>
      <span className="text-sm"> {timeLocale} </span>
    </div>
  );
}
