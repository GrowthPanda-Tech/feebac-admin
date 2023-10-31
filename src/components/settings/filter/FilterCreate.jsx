import { useState, useContext } from "react";
import { FilterContext } from "../../../contexts/FilterContext";

import makeRequest from "../../../utils/makeRequest";
import swal from "../../../utils/swal";

function Label({ name, children }) {
    return (
        <label className="flex flex-col">
            <span className="font-medium text-lg mb-2"> {name} </span>
            {children}
        </label>
    );
}

export default function FilterCreate({ setIsShowFilterCreate }) {
    const { response, setResponse } = useContext(FilterContext);

    const [loading, setLoading] = useState(false);
    const [filterVals, setFilterVals] = useState({
        dataType: 3,
        isSelect: true,
        name: "",
        options: [],
    });

    const handleSubmit = async () => {
        setLoading(true);

        try {
            const res = await makeRequest(
                "config/add-profile-key-value",
                "POST",
                filterVals
            );

            if (!res.isSuccess) {
                throw new Error(response.message);
            }

            const updatedRes = { ...response };
            updatedRes.data[2].key.push(res.data);

            setResponse(updatedRes);
            setIsShowFilterCreate(false);

            swal("success", res.message);
        } catch (error) {
            swal("error", error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-10 bg-white rounded-md flex flex-col gap-6">
            <Label name={"Filter Name"}>
                <input
                    name="name"
                    className="input-settings"
                    onChange={(event) =>
                        setFilterVals({
                            ...filterVals,
                            name: event.target.value,
                        })
                    }
                />
            </Label>

            <div className="flex gap-4">
                <button className="btn-primary" onClick={handleSubmit}>
                    Add
                </button>
                <button
                    className="btn-secondary"
                    onClick={() => setIsShowFilterCreate(false)}
                >
                    Cancel
                </button>
            </div>
        </div>
    );
}
