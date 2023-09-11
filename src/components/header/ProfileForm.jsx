import { React, useState } from "react";
import defaultImgPreview from "../../assets/defaultImgPreview.png";

function ProfileForm({ setShow, show, userData, setUserData }) {
    const [imgPreview, setImgPreview] = useState(defaultImgPreview);
    const [imgUpdate, setImgUpdate] = useState(false);
    const baseUrl = import.meta.env.VITE_BACKEND_URL;
    const [updatedData, setUpdatedData] = useState({});

    function InputForm({ label, name, value, onChange }) {
        return (
            <div className="pb-6">
                <label className="font-semibold text-gray-700 block pb-1">
                    {label}
                </label>
                <div className="flex">
                    <input
                        name={name}
                        className="border-2 rounded-r px-4 py-2 w-full"
                        value={value}
                        onChange={onChange}
                    />
                </div>
            </div>
            // <label className="flex flex-col">
            //     <span className="font-semibold mb-2"> {label} </span>
            //     <input
            //         name={name}
            //         value={value}
            //         onChange={onChange}
            //         className="input-article border-none"
            //     />
            // </label>
        );
    }

    const handleChange = (event) => {
        if (event.target.name === "userImage") {
            const file = e.target.files[0];
            setImgUpdate({
                ...imgUpdate,
                isUpdateImage: true,
                userImage: file,
            });

            if (file) {
                const reader = new FileReader();
                reader.onload = () => setImgPreview(reader.result);
                reader.readAsDataURL(file);
            }

            return;
        }

        setUserData({
            ...userData,
            [event.target.name]: event.target.value,
        });
    };

    return (
        <div className="fixed top-0 left-0 w-full flex justify-center items-center update-user h-[100vh] ">
            <div className="bg-white p-5">
                <h3 className="font-seminold text-2xl mb-4">
                    Edit Admin Profile
                </h3>
                <InputForm
                    label={"First Name"}
                    name={"first_name"}
                    value={userData ? userData.first_name : ""}
                    onChange={handleChange}
                />
                <InputForm
                    label={"Last Name"}
                    name={"Last_name"}
                    value={userData ? userData.last_name : ""}
                    onChange={handleChange}
                />
                <InputForm
                    label={"Email"}
                    name={"email"}
                    value={userData ? userData.email : ""}
                    onChange={handleChange}
                />
                <InputForm
                    label={"Mobile No:"}
                    name={"mobile"}
                    value={userData ? userData.mobile : ""}
                    onChange={handleChange}
                />
                <InputForm
                    label={"City"}
                    name={"city"}
                    value={userData ? userData.city : ""}
                    onChange={handleChange}
                />
                <InputForm
                    label={"Date Of Birth"}
                    name={"date_of_birth"}
                    value={userData ? userData.date_of_birth : ""}
                    onChange={handleChange}
                />

                <div className=" flex p-3 gap-3">
                    <button
                        className="btn-primary"
                        onClick={() => {
                            console.log("Hii");
                        }}
                    >
                        Save Changes
                    </button>
                    <button
                        className="btn-secondary"
                        onClick={() => {
                            setShow(!show);
                        }}
                    >
                        Cancle
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ProfileForm;
