import { useState, useContext } from "react";
import { FilterContext } from "../../../contexts/FilterContext";

import makeRequest from "../../../utils/makeRequest";
import swal from "../../../utils/swal";

export default function FilterValues({ filter, filterIdx }) {
    const { response, setResponse } = useContext(FilterContext);

    const [addingOption, setAddingOption] = useState(false);
    const [newOption, setNewOption] = useState("");

    const handleOptionRemove = async (index) => {
        try {
            const res = await makeRequest(
                `config/delete-profile-key-option?dataType=3&key=${filter.id}&option=${filter.options[index]}`,
                "DELETE"
            );

            if (!res.isSuccess) {
                throw new Error(response.message);
            }

            const updatedRes = { ...response };
            updatedRes.data[2].key[filterIdx].options.splice(index, 1);

            setResponse(updatedRes);
        } catch (error) {
            swal("error", error.message);
        }
    };

    const handleOptionAdd = async () => {
        const updatedRes = { ...response };
        updatedRes.data[2].key[filterIdx].options.push(newOption);

        setResponse(updatedRes);

        const request = {
            dataType: 3,
            key: filter.id,
            newOptions: [newOption],
        };

        try {
            const res = await makeRequest(
                "config/add-profile-options",
                "POST",
                request
            );

            if (!res.isSuccess) {
                throw new Error(res.message);
            }
        } catch (error) {
            swal("error", error.message);

            const updatedRes = { ...response };
            updatedRes.data[2].key[index].options.pop();

            setResponse(updatedRes);
        }
    };

    const handleKey = (event) => {
        const key = event.key;

        switch (key) {
            case "Enter":
                handleOptionAdd();
                setNewOption("");
                break;

            case "Escape":
                setAddingOption(false);
                break;

            default:
                break;
        }
    };

    return (
        <div className="flex flex-col gap-4">
            {filter.options.map((option, index) => (
                <div key={index} className="flex justify-between items-center">
                    <span className="text-accent font-semibold">{option}</span>
                    <i
                        className="fa-solid fa-xmark cursor-pointer"
                        onClick={() => handleOptionRemove(index)}
                    ></i>
                </div>
            ))}

            {addingOption ? (
                <input
                    autoFocus
                    className="input-settings"
                    placeholder="Add a value or press Esc"
                    type="text"
                    value={newOption}
                    onChange={(e) => setNewOption(e.target.value)}
                    onKeyUp={(event) => handleKey(event)}
                />
            ) : (
                <div
                    className="flex items-center cursor-pointer"
                    onClick={() => setAddingOption(true)}
                >
                    <i className="fa-solid fa-plus mr-4"></i>
                    <span> Add More Values </span>
                </div>
            )}
        </div>
    );
}
