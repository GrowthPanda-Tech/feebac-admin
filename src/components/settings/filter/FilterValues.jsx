export default function FilterValues({filter}) {
    return (
        <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-4">
                {filter.options.map((option) => (
                    <div className="flex justify-between items-center">
                        <span className="text-accent font-medium">{option}</span>
                        <i className="fa-solid fa-xmark cursor-pointer"></i>
                    </div>
                ))}
            </div>
            <div className="cursor-pointer">
                <i className="fa-solid fa-plus mr-4"></i>
                <span> Add More Values </span>
            </div>
        </div>
    );
}

