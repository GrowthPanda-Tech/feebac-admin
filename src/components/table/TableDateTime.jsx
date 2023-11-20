import dateConvert from "../../utils/dateConvert";

export default function TableDateTime({ data }) {
    const local = dateConvert(data, "local");

    const date = local.split(",")[0];
    const time = local.split(",")[1];

    return (
        <div className="flex flex-col gap-2">
            <span> {date} </span>
            <span className="text-sm"> {time} </span>
        </div>
    );
}
