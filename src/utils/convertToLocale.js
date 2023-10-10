export default function convertToLocale(date) {
    const dateObj = new Date(`${date} UTC`);
    const dateLocale = dateObj.toLocaleString("en-GB");

    return dateLocale;
}
