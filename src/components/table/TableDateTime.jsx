import convertToLocale from "../../utils/convertToLocale";

export default function TableDateTime({ data }) {
    const locale = convertToLocale(data);
    const date = locale.split(",")[0];
    const time = locale.split(",")[1];

    return (
        <div className="flex flex-col gap-2">
            <span> {date} </span>
            <span className="text-sm"> {time} </span>
        </div>
    );
}
