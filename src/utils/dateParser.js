export default function dateParser(dateStr) {
  const date = new Date(dateStr);

  const dateOpts = {
    day: "numeric",
    month: "short",
    year: "numeric",
  };

  const timeOpts = {
    hour: "numeric",
    minute: "numeric",
    hour12: false,
  };

  const dateFormatter = new Intl.DateTimeFormat("en-IN", dateOpts);
  const timeFormatter = new Intl.DateTimeFormat("en-IN", timeOpts);

  const localDate = dateFormatter.format(date);
  const localTime = timeFormatter.format(date);

  return `${localDate}, ${localTime}`;
}
