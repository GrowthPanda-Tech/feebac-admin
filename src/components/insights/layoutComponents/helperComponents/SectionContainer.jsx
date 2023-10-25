export default function SectionContainer({ children }) {
    return (
        <div className="p-12 rounded-lg border border-solid border-[#E2E8F0] flex flex-col gap-6">
            {children}
        </div>
    );
}
