export default function Table({ children }) {
    return (
        <table className="table-fixed w-full min-h-screen bg-white rounded-xl text-center">
            {children}
        </table>
    );
}
