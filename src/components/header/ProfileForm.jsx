import { React, useState } from "react";
import defaultImgPreview from "../../assets/defaultImgPreview.png";
import formSubmit from "../../utils/formSubmit";
import makeRequest from "../../utils/makeRequest";
import AlertComponent from "../AlertComponent/AlertComponent";

function InputForm({ label, name, value, onChange, type }) {
    return (
        <div className="pb-6">
            <label className="font-semibold text-gray-700 block pb-1">
                {label}
            </label>
            <div className="flex">
                <input
                    name={name}
                    className="border-2  input-article  rounded-r px-4 py-2 w-full"
                    value={value}
                    onChange={onChange}
                    required
                />
            </div>
        </div>
    );
}

function ProfileForm({ setShow, show, userData, setUserData }) {
    const [imgPreview, setImgPreview] = useState(defaultImgPreview);
    const [imgUpdate, setImgUpdate] = useState();
    const baseUrl = import.meta.env.VITE_BASE_URL;
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    const [updatedData, setUpdatedData] = useState({
        ...userData,
        date_of_birth: convertDate(userData.date_of_birth),
    });
    const [isUpdateImage, setIsUpdateImage] = useState(false);
    const [isDateChnage, setIsDateChange] = useState(false);

    function convertDateFormat(inputDate) {
        return inputDate.replace(/\//g, "-");
    }
    function convertDate(inputDate) {
        return inputDate.replace(/-/g, "/");
    }

    const handleImageSubmit = async (event) => {
        if (isUpdateImage) {
            const formData = new FormData();
            formData.append("userImage", imgUpdate.userImage);

            const res = await formSubmit(
                event,
                "profile/upload-image",
                "POST",
                formData
            );
            if (res.isSuccess) {
                let custom = {
                    message: "Profile Pic Updated Successfully ",
                };
                AlertComponent("success", custom);
                const getAdminInfo = async () => {
                    try {
                        const response = await makeRequest(`profile/`, "GET");
                        if (response.isSuccess) {
                            setUserData(response.userInfo);
                        }
                    } catch (error) {
                        console.error(error);
                    }
                };

                getAdminInfo();
            }
            setIsUpdateImage(!isUpdateImage);
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            delete updatedData.mobile;
            delete updatedData.profile_pic;
            delete updatedData.total_followers;
            delete updatedData.total_followings;
            delete updatedData.loyalty_points;
            delete updatedData.interest;

            const response = await makeRequest(
                "profile/update-profile",
                "PUT",
                updatedData
            );
            if (response.isSuccess) {
                let custom = {
                    message: "User Profile Updated Successfully ",
                };
                AlertComponent("success", custom);
                localStorage.removeItem(
                    "userInfo",
                    JSON.stringify(response.userInfo)
                );
                localStorage.setItem(
                    "userInfo",
                    JSON.stringify(response.userInfo)
                );
                setShow(!show);

                AlertComponent("success", custom);
                const getAdminInfo = async () => {
                    try {
                        const response = await makeRequest(`profile/`, "GET");
                        if (response.isSuccess) {
                            setUserData(response.userInfo);
                        }
                    } catch (error) {
                        console.error(error);
                    }
                };

                getAdminInfo();
            } else {
                AlertComponent("failed", response);
            }
        } catch (error) {}
    };

    const dateChangeHandler = (event) => {
        setIsDateChange(true);
        let newDate = convertDate(event.target.value);
        setUpdatedData({
            ...updatedData,
            date_of_birth: newDate,
        });
    };

    const handleChange = (event) => {
        if (event.target.name === "userImage") {
            setIsUpdateImage(true);
            const file = event.target.files[0];
            setImgUpdate({
                ...imgUpdate,
                isUpdateImage: true,
                userImage: file,
            });

            if (file) {
                const reader = new FileReader();
                reader.onload = () => setImgPreview(reader.result);
                console.log(reader.result);
                reader.readAsDataURL(file);
            }

            return;
        }

        setUpdatedData({
            ...updatedData,
            [event.target.name]: event.target.value,
        });
    };
    return (
        <div className="fixed top-0 left-0 w-full flex justify-center items-center update-user h-[100vh] ">
            <div className="flex bg-white justify-around p-10 w-[80%] rounded-lg">
                <div className="flex-col justify-between mt-8 h-96 w-96 items-center  mx-2 flex ">
                    <div className="h-20vh">
                        <img
                            src={
                                isUpdateImage
                                    ? imgPreview
                                    : baseUrl + updatedData.profile_pic
                            }
                            className="rounded-full border-double  h-96 w-96 border-4 border-[#A43948]"
                        />
                    </div>

                    <label className="flex flex-col">
                        <span className="font-semibold mb-2">Change Image</span>
                        <input
                            name="userImage"
                            type="file"
                            accept="image/*"
                            className="input-article border-none"
                            onChange={handleChange}
                        />
                    </label>
                    {isUpdateImage && (
                        <button
                            className="btn-primary"
                            onClick={handleImageSubmit}
                        >
                            Save Image
                        </button>
                    )}
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="bg-white p-5">
                        <h3 className="font-seminold text-2xl mb-4">
                            Edit Admin Profile
                        </h3>
                        <InputForm
                            label={"First Name"}
                            name={"first_name"}
                            value={updatedData ? updatedData.first_name : ""}
                            onChange={handleChange}
                        />
                        <InputForm
                            label={"Last Name"}
                            name={"last_name"}
                            value={updatedData ? updatedData.last_name : ""}
                            onChange={(e) => {
                                handleChange(e);
                            }}
                        />
                        <InputForm
                            label={"Email"}
                            name={"email"}
                            value={updatedData ? updatedData.email : ""}
                            onChange={(e) => {
                                handleChange(e);
                            }}
                        />

                        <InputForm
                            label={"City"}
                            name={"city"}
                            value={updatedData ? updatedData.city : ""}
                            onChange={(e) => {
                                handleChange(e);
                            }}
                        />
                        <InputForm
                            label={"State"}
                            name={"state"}
                            value={updatedData ? updatedData.state : ""}
                            onChange={(e) => {
                                handleChange(e);
                            }}
                        />

                        <div className="pb-6">
                            <label className="font-semibold text-gray-700 block pb-1">
                                Date of Birth
                            </label>
                            <div className="flex">
                                <input
                                    name="date_of_birth"
                                    className="border-2  input-article  rounded-r px-4 py-2 w-full"
                                    value={
                                        isDateChnage
                                            ? updatedData
                                                ? convertDateFormat(
                                                      updatedData.date_of_birth
                                                  )
                                                : ""
                                            : updatedData
                                            ? convertDateFormat(
                                                  updatedData.date_of_birth
                                              )
                                            : ""
                                    }
                                    type="date"
                                    onChange={dateChangeHandler}
                                    required
                                />
                            </div>
                        </div>
                        {/* <InputForm
                        label={"Date Of Birth"}
                        name={"date_of_birth"}
                        value={updatedData ? updatedData.date_of_birth : ""}
                        onChange={(e) => {
                            handleChange(e);
                        }}
                    /> */}

                        <div className=" flex p-3 gap-3">
                            <button className="btn-primary">
                                Save Changes
                            </button>
                            <button
                                className="btn-secondary"
                                onClick={() => {
                                    setShow(!show);
                                }}
                            >
                                cancel
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default ProfileForm;
