export default function dateToday() {
    const dateObj = new Date();
    const ikea = dateObj.toLocaleString("sv-SE");

    const formatted = `${ikea.split(" ")[0]}T00:00:00`;
    return formatted;
}
