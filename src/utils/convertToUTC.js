export default function convertToUTC(date) {
    const dateObj = new Date(date);

    const options = {
        hour12: false,
        timeZone: "UTC",
    };
    const dateLocale = dateObj.toLocaleString("ja-JP", options);

    return dateLocale;
}
