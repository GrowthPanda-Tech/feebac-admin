import { useState } from "react";

export default function FilterValues({ filter }) {
    const [options, setOptions] = useState(filter.options);
    const [addingOption, setAddingOption] = useState(false);
    const [newOption, setNewOption] = useState('');

    const handleOptionRemove = (index) => {
        const updatedOptions = options.filter((_, i) => i !== index);
        setOptions(updatedOptions);
    };

    const handleOptionAdd = () => {
        const updatedOptions = options.slice();
        updatedOptions.push(newOption);
        setOptions(updatedOptions)
    };

    const handleKey = (event) => {
        if (event.key === 'Enter') {
            handleOptionAdd();
            setNewOption('');
        } else if (event.key === 'Escape') {
            setAddingOption(false)
        }
    }

    return (
        <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-4">
                {options.map((option, index) => (
                    <div key={index} className="flex justify-between items-center">
                        <span className="text-accent font-medium">{option}</span>
                        <i
                            className="fa-solid fa-xmark cursor-pointer"
                            onClick={() => handleOptionRemove(index)}
                        ></i>
                    </div>
                ))}
            </div>
            <>
                {addingOption ? (
                    <input
                        className="input-settings"
                        placeholder="Add a value or press Esc"
                        type="text"
                        value={newOption}
                        onChange={(e) => setNewOption(e.target.value)}
                        onKeyUp={(event) => handleKey(event)} />
                ) : (
                        <div className="flex items-center cursor-pointer" onClick={() => setAddingOption(true)}>
                            <i className="fa-solid fa-plus mr-4"></i>
                            <span> Add More Values </span>
                        </div>
                    )}
            </>
        </div>
    );
}

