import { useState } from "react";

import makeRequest from "@/utils/makeRequest";

// assets
import loginBanner from "@/assets/loginBanner.png";
import eye_open from "@/assets/outline_eye_open.png";
import eye_closed from "@/assets/outline_eye_closed.png";

// components
import { Spinner } from "@material-tailwind/react";

export default function Login() {
  const [loginInfo, setLoginInfo] = useState({ email: "", password: "" });
  const [alertInfo, setAlertInfo] = useState({ message: "", type: null });
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      const response = await makeRequest(
        "site-admin/auth/login",
        "POST",
        loginInfo,
      );
      if (!response.isSuccess) throw new Error(response.message);

      // set JWT in localstorage (lord forgive me)
      localStorage.setItem("authToken", response.data.authToken);
      location.replace("/");
    } catch (error) {
      setAlertInfo({ type: "error", message: error.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen w-full bg-white p-28">
      <div className="aspect-square w-1/2">
        <img src={loginBanner} className="mx-auto h-full" alt="loading" />
      </div>

      {/* Separation bar */}
      <div className="w-0.5 bg-black"></div>

      <div className="flex w-1/2 flex-col justify-center gap-16 px-16">
        <div className="text-3xl font-bold text-secondary">Login as Admin</div>

        <form className="flex flex-col gap-6" onSubmit={handleLogin}>
          <div className="flex flex-col gap-6 text-xl">
            <input
              type="email"
              name="email"
              placeholder="Email ID"
              value={loginInfo.email}
              onChange={(e) =>
                setLoginInfo((prev) => ({
                  ...prev,
                  email: e.target.value,
                }))
              }
              className="rounded-3xl border-2 border-[#EA8552] px-11 py-6 disabled:cursor-not-allowed disabled:opacity-50"
              required
            />

            <div className="relative flex items-center">
              <input
                type={!isShowPassword ? "password" : "text"}
                name="password"
                placeholder="Password"
                value={loginInfo.password}
                onChange={(e) =>
                  setLoginInfo((prev) => ({
                    ...prev,
                    password: e.target.value,
                  }))
                }
                className="w-full rounded-3xl border-2 border-[#EA8552] py-6 pl-11 pr-14 disabled:cursor-not-allowed disabled:opacity-50"
                required
              />

              <img
                src={!isShowPassword ? eye_open : eye_closed}
                className="absolute right-6 top-1/2 w-8 -translate-y-1/2 transform cursor-pointer"
                onClick={() => setIsShowPassword((prev) => !prev)}
              />
            </div>
          </div>

          <div>
            {alertInfo.message}
            {alertInfo.type == "success" && (
              <i className="fa-solid fa-circle-check ml-2 text-green"></i>
            )}
            {alertInfo.type == "error" && (
              <i className="fa-solid fa-circle-xmark ml-2 text-secondary"></i>
            )}
          </div>
          <button
            type="submit"
            className="mt-12 flex items-center justify-center rounded-3xl bg-secondary py-6 text-xl font-semibold text-white transition hover:bg-primary disabled:bg-light-grey disabled:text-grey"
            disabled={loading}
          >
            {loading ? "Logging In..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}
