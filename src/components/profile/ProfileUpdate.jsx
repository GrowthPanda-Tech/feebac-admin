import { useState, useContext, useEffect, useRef } from "react";
import { ProfileContext } from "@/contexts/ProfileContext";

import LoadingSpinner from "@helperComps/LoadingSpinner";
import Input from "@helperComps/Input";
import Select from "@helperComps/Select";

import makeRequest from "@/utils/makeRequest";
import swal from "@/utils/swal";
import fileReader from "@/utils/fileReader";

export default function ProfileUpdate() {
  const { loading, fetchedData, setFetchedData, error } =
    useContext(ProfileContext);

  const [userState, setUserState] = useState({});
  const [updateState, setUpdateState] = useState(null);
  const [isUpdate, setIsUpdate] = useState(false);
  const [imgPreview, setImgPreview] = useState(null);

  const imgRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setUserState((prev) => ({ ...prev, [name]: value }));
    setUpdateState((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];

    if (file) {
      try {
        const preview = await fileReader(file);

        setImgPreview(preview);
        setUpdateState({ ...updateState, profile_pic: file });
      } catch (error) {
        console.error("Error reading file: ", error);
      }
    }
  };

  const handleSubmit = async () => {
    const formdata = new FormData();
    for (const [key, value] of Object.entries(updateState)) {
      formdata.append(key, value);
    }

    setIsUpdate(true);

    try {
      const response = await makeRequest(
        "profile/update-profile",
        "PUT",
        formdata
      );

      if (!response.isSuccess) {
        throw new Error(response.message);
      }

      //update context
      const spread = { ...fetchedData };
      spread.userInfo = response.userInfo;
      setFetchedData(spread);

      swal("success", response.message);
    } catch (error) {
      setUserState(fetchedData.userInfo);
      setImgPreview(null);
      swal("error", error.message);
    } finally {
      setUpdateState(null);
      setIsUpdate(false);

      imgRef.current.value = null;
    }
  };

  useEffect(() => {
    if (fetchedData) {
      setUserState(fetchedData.userInfo);
    }
  }, [fetchedData]);

  if (loading) return <LoadingSpinner />;
  if (error) return <LoadingSpinner />; //TODO: handle error

  return (
    <div className="flex gap-4">
      <div className="rounded-xl flex flex-col gap-6 items-center justify-center md:w-2/5 bg-white shadow-md">
        <span className="text-xl font-semibold block">Admin Profile</span>
        <img
          className="rounded-full border-double h-56 w-56 border-4 border-[#A43948] hover:opacity-50 transition cursor-pointer"
          src={imgPreview ? imgPreview : userState.profile_pic}
          onClick={() => imgRef.current.click()}
        />
        <input
          name="profile_pic"
          ref={imgRef}
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          hidden
        />
      </div>

      <div className="md:w-3/5 p-8 bg-white shadow-md flex flex-col gap-6 rounded-xl">
        <Input
          label={"First Name"}
          name="first_name"
          value={userState.first_name}
          handleChange={handleChange}
        />

        <Input
          label={"Last Name"}
          name="last_name"
          value={userState.last_name}
          handleChange={handleChange}
        />

        <Select
          label={"Gender"}
          name={"gender"}
          value={userState.gender}
          options={["male", "female"]}
          handleChange={handleChange}
        />

        <Input
          label={"E-Mail"}
          name="email"
          value={userState.email}
          type="email"
          handleChange={handleChange}
        />

        <Input
          label={"Phone Number"}
          name="phone"
          value={userState.mobile}
          type="number"
          disabled
          handleChange={handleChange}
        />

        <Input
          label={"Date of Birth"}
          name="date_of_birth"
          value={userState.date_of_birth}
          type={"date"}
          handleChange={handleChange}
        />

        <button
          className={`${
            !updateState || isUpdate ? "btn-secondary" : "btn-primary"
          } mt-5 w-fit`}
          onClick={handleSubmit}
          disabled={!updateState || isUpdate ? true : false}
        >
          {isUpdate ? "Updating..." : "Save Changes"}
        </button>
      </div>
    </div>
  );
}
