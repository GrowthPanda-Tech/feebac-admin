import { useState, useContext } from "react";
import { ProfileContext } from "../../contexts/ProfileContext";

//utils
import dateConvert from "../../utils/dateConvert";

//components
import ProfileForm from "./ProfileForm";

function ProfileUpdate() {
  const { profile } = useContext(ProfileContext);
  const [show, setShow] = useState(false);

  return (
    <>
      <div className="block md:flex">
        <div className="w-full items-center justify-center flex flex-col md:w-2/5 p-4 sm:p-6 lg:p-8 bg-white shadow-md">
          <span className="text-xl font-semibold block">Admin Profile</span>

          <div className="w-full p-8 mx-2 flex justify-center">
            <img
              className="rounded-full border-double h-56 w-56 border-4 border-[#A43948]"
              src={profile.profile_pic}
            />
          </div>
        </div>

        <div className="w-full md:w-3/5 p-8 bg-white lg:ml-4 shadow-md">
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
                  value={`${profile.first_name ? profile.first_name : ""} ${
                    profile.last_name ? profile.last_name : ""
                  }`}
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
                value={profile.email}
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
                value={profile.mobile}
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
                  dateConvert(profile.date_of_birth, "local").split(",")[0]
                }
              />
            </div>

            <div className="pb-4 flex justify-between">
              <label className="text-gray-700 block pb-1">
                <span className="font-semibold">City</span>
                <input
                  name="city"
                  disabled
                  className="border-1 rounded-r p-2 w-full"
                  type="text"
                  value={profile.city}
                />
              </label>
              <label className="text-gray-700 block pb-1">
                <span className="font-semibold"> State </span>
                <input
                  name="state"
                  disabled
                  className="border-1 rounded-r p-2 w-full"
                  type="text"
                  value={profile.state}
                />
              </label>
            </div>
            <div className="pb-4 flex font-semibold justify-between">
              <span>Total Followers :{profile.total_followers}</span>
              <span>Total Followings :{profile.total_followings}</span>
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

      {show ? <ProfileForm setShow={setShow} /> : null}
    </>
  );
}

export default ProfileUpdate;
