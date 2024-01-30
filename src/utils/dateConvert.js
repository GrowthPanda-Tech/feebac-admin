export default function dateConvert(date, zone = "local") {
  const dateObject = new Date(date);

  switch (zone) {
    case "local":
      return dateObject.toLocaleString("en-GB");

    case "localISO":
      //thanks sweden
      return dateObject.toLocaleString("sv-SE").replace(" ", "T");

    case "UTC":
      return dateObject.toISOString();

    default:
      throw new Error(`Invalid zone value: ${zone}`);
  }
}
