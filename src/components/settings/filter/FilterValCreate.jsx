import { useState, useEffect } from "react"
import makeRequest from "../../../utils/makeRequest";

function Label({ name, children }) {
    return (
        <label className="flex flex-col">
            <span className="heading text-lg mb-2"> {name} </span>
            {children}
        </label>
    )
}

export default function FilterValCreate({setIsShowFilterValCreate}) {
    const [profileTypes, setProfileTypes] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [profileVals, setProfileVals] = useState({
        dataType:'1',
        isSelect:true,
        options:[],
    });

    const getProfileTypes = async () => {
        const response = await makeRequest('config/get-profile-data-types', 'GET');
        response.isSuccess ? setProfileTypes(response.data) : console.log(response.message);
    }

    const handleInputChange = (event) => {
        if (event.target.name === 'options') {
            const inputValue = event.target.value;
            setInputValue(inputValue);

            // Split input value by commas and remove leading/trailing spaces
            const arrayFromInput = inputValue.split(',').map(item => item.trim());
            setProfileVals({...profileVals, options: arrayFromInput});

            return;
        }

        setProfileVals({...profileVals, [event.target.name]: event.target.value});
    }

    const handleSubmit = async () => {
        const response = await makeRequest('config/add-profile-key-value', 'POST', profileVals);
        alert(response.message);
    }

    useEffect(() => {
        getProfileTypes();
    }, [])

    return (
        <div className="p-10 bg-white rounded-md flex flex-col gap-6 mb-6">
            <Label name={'Choose Profile Type'}>
                <select name="dataType" className="input-settings" onChange={handleInputChange}>
                    {
                        profileTypes.map((type) => (
                            <option 
                                value={type.id}
                                key={type.id}>
                                {type.name}
                            </option>
                        ))
                    }
                </select>
            </Label>

            <Label name={'Filter Name'}>
                <input
                    name="name"
                    className="input-settings"
                    onChange={handleInputChange}
                />
            </Label>

            <Label name={'Values'}>
                <input
                    className="input-settings"
                    name="options"
                    value={inputValue}
                    placeholder="Separate out values with commas"
                    onChange={handleInputChange}
                />
            </Label>

            <div className="flex gap-4">
                <button 
                    className="btn-primary"
                    onClick={handleSubmit}>
                    Add
                </button>
                <button
                    className="btn-secondary"
                    onClick={() => setIsShowFilterValCreate(false)}>
                    Cancel
                </button>
            </div>
        </div>
    );
}
