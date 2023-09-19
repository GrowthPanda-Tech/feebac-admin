export default function convertToUTC(date) {
    const utcYear = date.getUTCFullYear();
    const utcMonth = date.getUTCMonth();
    const utcDay = date.getUTCDate();
    const utcHours = date.getUTCHours();
    const utcMinutes = date.getUTCMinutes();

    const formattedOutput = `${utcYear}/${String(utcMonth + 1).padStart(
        2,
        "0"
    )}/${String(utcDay).padStart(2, "0")} ${String(utcHours).padStart(
        2,
        "0"
    )}:${String(utcMinutes).padStart(2, "0")}:00`;

    return formattedOutput;
}
