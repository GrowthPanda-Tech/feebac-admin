export default function Table({ children }) {
    return (
        <table className="table-fixed w-full bg-white text-center overflow-y-scroll">
            {children}
        </table>
    );
}
