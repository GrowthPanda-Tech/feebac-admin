export default function Tdata({ children, left, capitalize, mono }) {
  return (
    <td
      className={`px-4 py-6 ${left && "text-left"} ${
        capitalize && "capitalize"
      } ${mono && "font-mono"}`}
    >
      {children}
    </td>
  );
}
