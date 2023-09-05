export default function TableData({ data, left, capitalize, mono }) {
    return (
        <td
            className={`py-6 px-4 ${left && "text-left"} ${
                capitalize && "capitalize"
            } ${mono && "font-mono"}`}
        >
            {data}
        </td>
    );
}
