import { useState } from "react";
import makeRequest from "../../../utils/makeRequest";

export default function FilterCreate({setIsShowFilterCreate}) {
    const [filterType, setFilterType] = useState({});

    const onChange = (event) => setFilterType({name: event.target.value});

    const handleSubmit = async () => {
        const response = await makeRequest('config/add-data-type', 'POST', filterType);
        alert(response.message);
        response.isSuccess && setIsShowFilterCreate(false);
    }

    return (
        <div className="p-10 bg-white rounded-md flex flex-col gap-6 mb-6">
            <label className="flex flex-col">
                <span
                    className="heading mb-4 text-lg">
                    Profile type (Primary, Secondary, etc..)
                </span>
                <input
                    onChange={onChange}
                    className="border border-[#C9CED6] rounded-md py-4 px-6"
                />
            </label>

            <div className="flex gap-4">
                <button
                    className="btn-primary"
                    onClick={handleSubmit}>
                    Add
                </button>
                <button
                    className="btn-secondary"
                    onClick={() => setIsShowFilterCreate(false)}>
                    Cancel
                </button>
            </div>
        </div>
    );
}
