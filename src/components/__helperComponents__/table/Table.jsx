export default function Table({ children }) {
  return (
    <table className="w-full table-fixed overflow-y-scroll bg-white text-center">
      {children}
    </table>
  );
}
