export default function Table({ children }) {
    return (
        <table className="table-fixed w-full bg-white rounded-xl text-center">
            {children}
        </table>
    );
}
