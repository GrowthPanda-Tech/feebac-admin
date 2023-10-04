import React from "react";
import defaultUser from "../../assets/defaultUser.png";
import { useState } from "react";
import makeRequest from "../../utils/makeRequest";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import ProfileForm from "./ProfileForm";

function ProfileUpdate() {
    const baseUrl = import.meta.env.VITE_BASE_URL;
    const [userData, setUserData] = useState();
    const [show, setShow] = useState(false);
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

    useEffect(() => {
        getAdminInfo();
    }, []);

    console.log(userData);

    return (
        <>
            <div className="">
                {userData && (
                    <div className=" block md:flex">
                        <div className="w-full md:w-2/5 p-4 sm:p-6 lg:p-8 bg-white shadow-md">
                            <div className="flex justify-between">
                                <span className="text-xl font-semibold block">
                                    Admin Profile
                                </span>
                            </div>

                            <span className="text-gray-600">
                                This information is secret so be careful
                            </span>
                            <div className="w-full p-8 mx-2 flex justify-center">
                                <img
                                    className="rounded-full border-double h-56 w-56 border-4 border-[#A43948]"
                                    src={baseUrl + userData.profile_pic}
                                    alt=""
                                />
                            </div>
                        </div>

                        <div className="w-full md:w-3/5 p-8 bg-white lg:ml-4 shadow-md">
                            <span className="text-gray-600 pt-4 block opacity-70">
                                Personal login information of your account
                            </span>
                            <div className="rounded  shadow p-6">
                                <div className="pb-6">
                                    <label className="font-semibold text-gray-700 block pb-1">
                                        Name
                                    </label>
                                    <div className="flex">
                                        <input
                                            disabled
                                            name="username"
                                            className="border-1  rounded-r px-4 py-2 w-full"
                                            type="text"
                                            value={
                                                userData &&
                                                userData.first_name +
                                                    userData.last_name
                                            }
                                        />
                                    </div>
                                </div>
                                <div className="pb-4">
                                    <label className="font-semibold text-gray-700 block pb-1">
                                        Email
                                    </label>
                                    <input
                                        name="email"
                                        disabled
                                        className="border-1  rounded-r px-4 py-2 w-full"
                                        type="email"
                                        value={userData && userData.email}
                                    />
                                </div>
                                <div className="pb-4">
                                    <label className="font-semibold text-gray-700 block pb-1">
                                        Phone
                                    </label>
                                    <input
                                        name="phone"
                                        disabled
                                        className="border-1  rounded-r px-4 py-2 w-full"
                                        type="number"
                                        value={userData && userData.mobile}
                                    />
                                </div>
                                <div className="pb-4">
                                    <label className="font-semibold text-gray-700 block pb-1">
                                        Date Of Birth
                                    </label>
                                    <input
                                        name="date_of_birth"
                                        disabled
                                        className="border-1  rounded-r px-4 py-2 w-full"
                                        type="text"
                                        value={
                                            userData && userData.date_of_birth
                                        }
                                    />
                                </div>

                                <div className="pb-4 flex justify-between">
                                    <div className="">
                                        <label className="font-semibold text-gray-700 block pb-1">
                                            City
                                        </label>
                                        <input
                                            name="city"
                                            disabled
                                            className="border-1  rounded-r py-2 w-full"
                                            type="text"
                                            value={userData && userData.city}
                                        />
                                    </div>
                                    <div className="">
                                        <label className="font-semibold text-end text-gray-700 block pb-1">
                                            State
                                        </label>
                                        <input
                                            name="state"
                                            disabled
                                            className="border-1 text-end rounded-r py-2 w-full"
                                            type="text"
                                            value={userData && userData.state}
                                        />
                                    </div>
                                </div>
                                <div className="pb-4 flex font-semibold justify-between">
                                    <span>
                                        Total Followers :
                                        {userData && userData.total_followers}
                                    </span>
                                    <span>
                                        Total Followings :
                                        {userData && userData.total_followings}
                                    </span>
                                </div>
                            </div>
                            <button
                                className="btn-primary mt-5"
                                onClick={() => {
                                    setShow(!show);
                                }}
                            >
                                <i className="fa-solid fa-pen-to-square text-xl"></i>
                                Edit
                            </button>
                        </div>
                    </div>
                )}
            </div>
            {show && (
                <ProfileForm
                    show={show}
                    setShow={setShow}
                    userData={userData}
                    setUserData={setUserData}
                />
            )}
        </>
    );
}

export default ProfileUpdate;
