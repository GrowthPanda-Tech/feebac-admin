import { useState, useContext, useEffect } from "react";
import { ProfileContext } from "@/contexts/ProfileContext";

import LoadingSpinner from "@helperComps/LoadingSpinner";
import Input from "@helperComps/Input";
import Select from "@helperComps/Select";

import makeRequest from "@/utils/makeRequest";
import swal from "@/utils/swal";

export default function ProfileUpdate() {
  const { loading, fetchedData, setFetchedData, error } =
    useContext(ProfileContext);

  const [userModel, setUserModel] = useState({});
  const [updateModel, setUpdateModel] = useState(null);
  const [isUpdate, setIsUpdate] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setUserModel((prev) => ({ ...prev, [name]: value }));
    setUpdateModel((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    setIsUpdate(true);

    try {
      const response = await makeRequest(
        "profile/update-profile",
        "PUT",
        updateModel
      );

      if (!response.isSuccess) {
        throw new Error(response.message);
      }

      //update context
      const spread = { ...fetchedData };
      spread.userInfo = { ...spread.userInfo, ...updateModel };
      setFetchedData(spread);

      //clear update values
      setUpdateModel(null);

      swal("success", response.message);
    } catch (error) {
      setUserModel(fetchedData.userInfo);
      swal("error", error.message);
    } finally {
      setIsUpdate(false);
    }
  };

  useEffect(() => {
    if (fetchedData) {
      setUserModel(fetchedData.userInfo);
    }
  }, [fetchedData]);

  if (loading) return <LoadingSpinner />;
  if (error) return <LoadingSpinner />; //TODO: handle error

  return (
    <div className="flex">
      <div className="rounded-xl flex flex-col items-center justify-center md:w-2/5 p-4 sm:p-6 lg:p-8 bg-white shadow-md">
        <span className="text-xl font-semibold block">Admin Profile</span>

        <div className="w-full p-8 mx-2 flex justify-center">
          <img
            className="rounded-full border-double h-56 w-56 border-4 border-[#A43948]"
            src={userModel.profile_pic}
          />
        </div>
      </div>

      <div className="md:w-3/5 p-8 bg-white lg:ml-4 shadow-md flex flex-col gap-6 rounded-xl">
        <Input
          label={"First Name"}
          name="first_name"
          value={userModel.first_name}
          handleChange={handleChange}
        />

        <Input
          label={"Last Name"}
          name="last_name"
          value={userModel.last_name}
          handleChange={handleChange}
        />

        <Select
          label={"Gender"}
          name={"gender"}
          value={userModel.gender}
          options={["male", "female"]}
          handleChange={handleChange}
        />

        <Input
          label={"E-Mail"}
          name="email"
          value={userModel.email}
          type="email"
          handleChange={handleChange}
        />

        <Input
          label={"Phone Number"}
          name="phone"
          value={userModel.mobile}
          type="number"
          disabled
          handleChange={handleChange}
        />

        <Input
          label={"Date of Birth"}
          name="date_of_birth"
          value={userModel.date_of_birth}
          type={"date"}
          handleChange={handleChange}
        />

        <button
          className={`${
            !updateModel || isUpdate ? "btn-secondary" : "btn-primary"
          } mt-5 w-fit`}
          onClick={handleSubmit}
          disabled={!updateModel || isUpdate ? true : false}
        >
          {isUpdate ? "Updating..." : "Save Changes"}
        </button>
      </div>
    </div>
  );
}
