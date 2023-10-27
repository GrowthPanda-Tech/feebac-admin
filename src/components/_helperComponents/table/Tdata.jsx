export default function Tdata({ children, left, capitalize, mono }) {
    return (
        <td
            className={`py-6 px-4 ${left && "text-left"} ${
                capitalize && "capitalize"
            } ${mono && "font-mono"}`}
        >
            {children}
        </td>
    );
}
