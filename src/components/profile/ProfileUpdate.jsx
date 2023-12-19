import { useState, useContext } from "react";
import { ProfileContext } from "@/contexts/ProfileContext";

import LoadingSpinner from "@helperComps/LoadingSpinner";
import Input from "@helperComps/Input";
import Select from "@helperComps/Select";

export default function ProfileUpdate() {
  const { loading, fetchedData, setFetchedData, error } =
    useContext(ProfileContext);

  const [disabled, setDisabled] = useState(true);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const spread = { ...fetchedData };
    spread.userInfo[name] = value;
    setFetchedData(spread);
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <LoadingSpinner />; //TODO: handle error

  return (
    <div className="flex">
      <div className="rounded-xl flex flex-col items-center justify-center md:w-2/5 p-4 sm:p-6 lg:p-8 bg-white shadow-md">
        <span className="text-xl font-semibold block">Admin Profile</span>

        <div className="w-full p-8 mx-2 flex justify-center">
          <img
            className="rounded-full border-double h-56 w-56 border-4 border-[#A43948]"
            src={fetchedData?.userInfo.profile_pic}
          />
        </div>
      </div>

      <div className="md:w-3/5 p-8 bg-white lg:ml-4 shadow-md flex flex-col gap-6 rounded-xl">
        <Input
          label={"First Name"}
          name="first_name"
          value={fetchedData?.userInfo.first_name}
          disabled={disabled}
          handleChange={handleChange}
        />

        <Input
          label={"Last Name"}
          name="last_name"
          value={fetchedData?.userInfo.last_name}
          disabled={disabled}
          handleChange={handleChange}
        />

        <Select
          label={"Gender"}
          name={"gender"}
          value={fetchedData?.userInfo.gender}
          options={["male", "female"]}
          disabled={disabled}
          handleChange={handleChange}
        />

        <Input
          label={"E-Mail"}
          name="email"
          value={fetchedData?.userInfo.email}
          type="email"
          disabled={disabled}
          handleChange={handleChange}
        />

        <Input
          label={"Phone Number"}
          name="phone"
          value={fetchedData?.userInfo.mobile}
          type="number"
          disabled
          handleChange={handleChange}
        />

        <Input
          label={"Date of Birth"}
          name="date_of_birth"
          value={fetchedData?.userInfo.date_of_birth}
          type={"date"}
          disabled={disabled}
          handleChange={handleChange}
        />

        <button
          className="btn-primary mt-5 w-fit"
          onClick={() => setDisabled(!disabled)}
        >
          {disabled ? "Edit" : "Save Changes"}
        </button>
      </div>
    </div>
  );
}
