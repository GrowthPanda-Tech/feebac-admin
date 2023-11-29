import { useState, useContext, useRef } from "react";
import { ProfileContext } from "../../contexts/ProfileContext";

//utils
import makeRequest from "../../utils/makeRequest";
import swal from "../../utils/swal";

function InputForm({ label, name, value, onChange }) {
  return (
    <div className="pb-6">
      <label className="font-semibold text-gray-700 block pb-1">{label}</label>
      <div className="flex">
        <input
          name={name}
          className="border-2 input-article rounded-md px-4 py-2 w-full"
          value={value}
          onChange={onChange}
          required
        />
      </div>
    </div>
  );
}

export default function ProfileForm({ setShow }) {
  const { profile, setProfile } = useContext(ProfileContext);

  const [dataState, setDataState] = useState({ ...profile });
  const [dataUpdate, setDataUpdate] = useState({});
  const [imgData, setImgData] = useState({
    isUpdate: false,
    file: null,
    preview: profile.profile_pic,
  });

  const fileInpRef = useRef(null);

  const handleImageSubmit = async (event) => {
    event.preventDefault();

    if (!imgData.isUpdate) return;

    const formData = new FormData();
    formData.append("userImage", imgData.file);

    try {
      const response = await makeRequest(
        "profile/upload-image",
        "POST",
        formData
      );

      if (!response.isSuccess) {
        throw new Error(response.message);
      }

      swal("success", response.message);
      setProfile({ ...profile, profile_pic: response.imageUrl });
      setImgData({ ...imgData, preview: response.imageUrl });
    } catch (error) {
      swal("error", error.message);
    }

    setImgData(!imgData.isUpdate);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await makeRequest(
        "profile/update-profile",
        "PUT",
        dataUpdate
      );

      if (!response.isSuccess) {
        throw new Error(response.message);
      }

      swal("success", response.message);
      setProfile({ ...profile, ...dataUpdate });
      setShow((prev) => {
        !prev;
      });
    } catch (error) {
      swal("error", error.message);
    }
  };

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    if (name === "userImage") {
      const file = e.target.files[0];
      setImgData((prev) => ({ ...prev, isUpdate: true, file }));

      const reader = new FileReader();
      reader.onload = () =>
        setImgData((prev) => ({ ...prev, preview: reader.result }));
      reader.readAsDataURL(file);

      return;
    }

    setDataState({ ...dataState, [name]: value });
    setDataUpdate({ ...dataUpdate, [name]: value });
  };

  return (
    <div className="fixed top-0 left-0 w-full flex justify-center items-center update-user h-[100vh] ">
      <div className="flex bg-white justify-around p-10 w-[80%] rounded-lg">
        <div className="flex-col justify-between mt-8 h-96 w-96 items-center  mx-2 flex ">
          <div>
            <input
              ref={fileInpRef}
              name="userImage"
              type="file"
              accept="image/*"
              className="border-none hidden"
              onChange={handleChange}
            />
            <img
              src={imgData.preview}
              className="rounded-full border-double  h-96 w-96 border-4 border-[#A43948] cursor-pointer"
              onClick={() => fileInpRef.current.click()}
            />
          </div>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="bg-white p-5">
            <h3 className="font-seminold text-2xl mb-4">Edit Admin Profile</h3>
            <InputForm
              label={"First Name"}
              name={"first_name"}
              value={dataState ? dataState.first_name : ""}
              onChange={handleChange}
            />
            <InputForm
              label={"Last Name"}
              name={"last_name"}
              value={dataState.last_name ? dataState.last_name : ""}
              onChange={(e) => {
                handleChange(e);
              }}
            />
            <InputForm
              label={"Email"}
              name={"email"}
              value={dataState ? dataState.email : ""}
              onChange={(e) => {
                handleChange(e);
              }}
            />

            <InputForm
              label={"City"}
              name={"city"}
              value={dataState ? dataState.city : ""}
              onChange={(e) => {
                handleChange(e);
              }}
            />
            <InputForm
              label={"State"}
              name={"state"}
              value={dataState ? dataState.state : ""}
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
                  className="border-2 input-article rounded-md px-4 py-2 w-full"
                  value={dataState.date_of_birth}
                  type="date"
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="flex gap-3">
              {imgData.isUpdate && (
                <button
                  className="btn-primary w-fit"
                  onClick={handleImageSubmit}
                >
                  Save Image
                </button>
              )}

              <button className="btn-primary">Save Changes</button>
              <button
                className="btn-secondary"
                onClick={() => {
                  setShow((prev) => {
                    !prev;
                  });
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
