export default function TableData({
    data,
    left = false,
    truncate = false,
    capitalize = false,
    mono = false,
}) {
    return (
        <td
            className={`py-6 px-4 ${left && "text-left"} ${
                truncate && "truncate"
            } ${capitalize && "capitalize"} ${
                mono && "font-mono"
            } whitespace-nowrap`}
        >
            {data}
        </td>
    );
}
