import AlertComponent from "../../AlertComponent/AlertComponent";

const BASE_URL = import.meta.env.VITE_BASE_URL;

function Label({ name, children }) {
    return (
        <label className="flex flex-col">
            <span className="font-medium text-lg mb-2"> {name} </span>
            {children}
        </label>
    );
}

export default function FilterCreate({
    filterVals,
    setFilterVals,
    setTertiaryKeys,
    setIsShowFilterCreate,
}) {
    const handleSubmit = async () => {
        const request = {
            method: "POST",
            headers: {
                authToken: localStorage.getItem("authToken"),
            },
            body: JSON.stringify(filterVals),
        };

        try {
            const response = await fetch(
                `${BASE_URL}/config/add-profile-key-value`,
                request
            );

            if (response.status >= 500) {
                throw new Error(response.status);
            }

            const json = await response.json();
            console.log(json);

            if (!json.isSuccess) {
                throw new Error(json.message);
            }

            setIsShowFilterCreate(false);
            setTertiaryKeys((prev) => [...prev, json.data]);
        } catch (error) {
            AlertComponent("error", error);
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
