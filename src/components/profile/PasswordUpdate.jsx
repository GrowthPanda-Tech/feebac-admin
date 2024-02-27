import { useState } from "react";
import eye_open from "@/assets/outline_eye_open.png";
import eye_closed from "@/assets/outline_eye_closed.png";
import makeRequest from "@/utils/makeRequest";
import swal from "@/utils/swal";
import { useNavigate } from "react-router-dom";

export default function PasswordUpdate() {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [isShowOldPassword, setIsShowOldPassword] = useState(false);
  const [isShowNewPassword, setIsShowNewPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleOldPasswordChange = (event) => {
    setOldPassword(event.target.value);
  };

  const handleNewPasswordChange = (event) => {
    setNewPassword(event.target.value);
  };

  const toggleShowOldPassword = () => {
    setIsShowOldPassword(!isShowOldPassword);
  };

  const toggleShowNewPassword = () => {
    setIsShowNewPassword(!isShowNewPassword);
  };

  const handleSubmit = async () => {
    console.log("Old Password:", oldPassword);
    console.log("New Password:", newPassword);
    setLoading(true);
    try {
      const response = await makeRequest(
        "site-admin/auth/update-password",
        "PATCH",
        {
          old_password: oldPassword,
          new_password: newPassword,
        },
      );
      console.log(response);
      if (!response.isSuccess) {
        throw new Error(response.message);
      }
      swal("success", response.message);
      navigate("/");
    } catch (error) {
      console.log(error);
      swal("error", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-[80vh] items-center justify-center">
      <div className="w-full max-w-xl rounded-lg bg-white px-10 py-20">
        <h2 className="mb-6 text-xl font-semibold ">Change Password</h2>
        <div className="relative mb-4">
          <input
            type={isShowOldPassword ? "text" : "password"}
            placeholder="Old Password"
            className="w-full rounded-lg border border-[#A6ACBE] px-4 py-2 disabled:cursor-not-allowed disabled:bg-white disabled:opacity-50"
            value={oldPassword}
            onChange={handleOldPasswordChange}
          />
          <img
            src={!isShowOldPassword ? eye_open : eye_closed}
            className="absolute right-6 top-1/2 w-8 -translate-y-1/2 transform cursor-pointer"
            alt="Toggle Old Password Visibility"
            onClick={toggleShowOldPassword}
          />
        </div>
        <div className="relative mb-4">
          <input
            type={isShowNewPassword ? "text" : "password"}
            placeholder="New Password"
            className="w-full rounded-lg border border-[#A6ACBE] px-4 py-2 disabled:cursor-not-allowed disabled:bg-white disabled:opacity-50"
            value={newPassword}
            onChange={handleNewPasswordChange}
          />
          <img
            src={!isShowNewPassword ? eye_open : eye_closed}
            className="absolute right-6 top-1/2 w-8 -translate-y-1/2 transform cursor-pointer"
            alt="Toggle New Password Visibility"
            onClick={toggleShowNewPassword}
          />
        </div>
        <div className="flex justify-center align-middle">
          <button
            type="submit"
            className="w-100 text-md mt-5 rounded-lg  bg-secondary px-8 py-4 text-center text-white transition hover:bg-primary disabled:bg-light-grey disabled:text-grey"
            disabled={loading}
            onClick={handleSubmit}
          >
            {loading ? "Submitting..." : "Submit"}
          </button>
        </div>
      </div>
    </div>
  );
}
