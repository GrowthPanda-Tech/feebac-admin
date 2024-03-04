import { useState } from "react";
import { useNavigate } from "react-router-dom";

// utils
import makeRequest from "@/utils/makeRequest";
import swal from "@/utils/swal";

// assets
import eye_open from "@/assets/outline_eye_open.png";
import eye_closed from "@/assets/outline_eye_closed.png";

export default function PasswordUpdate() {
  const [password, setPassword] = useState({ old: "", new: "" });
  const [visibility, setVisibility] = useState({ old: false, new: false });
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async () => {
    setLoading(true);

    try {
      const response = await makeRequest(
        "site-admin/auth/update-password",
        "PATCH",
        {
          old_password: password.old,
          new_password: password.new,
        },
      );

      if (!response.isSuccess) throw new Error(response.message);
      swal("success", response.message);
      navigate("/");
    } catch (error) {
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
            type={visibility.old ? "text" : "password"}
            placeholder="Old Password"
            className="w-full rounded-lg border border-[#A6ACBE] px-7 py-4 disabled:cursor-not-allowed disabled:bg-white disabled:opacity-50"
            value={password.old}
            onChange={(e) =>
              setPassword((prev) => ({ ...prev, old: e.target.value }))
            }
          />
          <img
            src={!visibility.old ? eye_open : eye_closed}
            className="absolute right-6 top-1/2 w-8 -translate-y-1/2 transform cursor-pointer"
            alt="Toggle Old Password Visibility"
            onClick={() =>
              setVisibility((prev) => ({ ...prev, old: !prev.old }))
            }
          />
        </div>
        <div className="relative mb-4">
          <input
            type={visibility.new ? "text" : "password"}
            placeholder="New Password"
            className="w-full rounded-lg border border-[#A6ACBE] px-7 py-4 disabled:cursor-not-allowed disabled:bg-white disabled:opacity-50"
            value={password.new}
            onChange={(e) =>
              setPassword((prev) => ({ ...prev, new: e.target.value }))
            }
          />
          <img
            src={!visibility.new ? eye_open : eye_closed}
            className="absolute right-6 top-1/2 w-8 -translate-y-1/2 transform cursor-pointer"
            alt="Toggle New Password Visibility"
            onClick={() =>
              setVisibility((prev) => ({ ...prev, new: !prev.new }))
            }
          />
        </div>
        <div className="flex justify-center align-middle">
          <button
            type="submit"
            className="text-md rounded-xl bg-secondary px-11 py-3 text-center font-semibold text-white transition hover:bg-primary disabled:bg-light-grey disabled:text-grey"
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
