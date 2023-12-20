import { useState } from "react";
import loginBanner from "../../assets/loginBanner.png";

import makeRequest from "../../utils/makeRequest";
import forbidChars from "../../utils/forbidChars";

import OtpField from "./OtpField";
import { Spinner } from "@material-tailwind/react";

function LargeBtn({ children }) {
  return (
    <button className="bg-primary flex justify-center items-center transition hover:bg-accent text-white py-6 text-xl rounded-3xl font-semibold">
      {children}
    </button>
  );
}

export default function Login() {
  const [inputData, setInputData] = useState({});
  const [loginInfo, setLoginInfo] = useState({
    mobile: "",
    isAdminLogin: true,
  });
  const [alertInfo, setAlertInfo] = useState({ message: "", type: null });
  const [otpStatus, setOtpStatus] = useState(true);

  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    if (event.target.name === "mobile") {
      setLoginInfo({
        ...loginInfo,
        [event.target.name]: event.target.value.slice(0, 10),
      });
    } else {
      setInputData({
        ...inputData,
        [event.target.name]: event.target.value.slice(0, 1),
      });
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      const response = await makeRequest("auth/login", "POST", loginInfo);

      if (!response.isSuccess) {
        setLoading(false);
        throw new Error(response.message);
      }

      setAlertInfo({
        ...alertInfo,
        message: response.message,
        type: "success",
      });

      setOtpStatus(false);
    } catch (error) {
      setAlertInfo({ message: error.message });
    } finally {
      setLoading(false);
    }
  };

  const handleVerify = async (e) => {
    e.preventDefault();

    let otp = "";

    Object.values(inputData).forEach((element) => {
      otp += element;
    });

    setLoading(true);

    try {
      const response = await makeRequest("auth/verify-otp", "POST", {
        mobile: loginInfo.mobile,
        otp: otp,
      });

      if (!response.isSuccess) {
        throw new Error(response.message);
      }

      localStorage.setItem("authToken", response.authToken);
      location.replace("/");
    } catch (error) {
      setAlertInfo({
        ...alertInfo,
        message: error.message,
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex w-full h-screen p-28 bg-white">
      <div className="w-1/2 aspect-square">
        <img src={loginBanner} className="h-full mx-auto" alt="loading" />
      </div>

      {/* Separation bar */}
      <div className="w-0.5 bg-black"></div>

      <div className="w-1/2 flex flex-col px-16 gap-6 justify-center">
        <div className="text-secondary text-3xl font-bold">Login as Admin</div>

        <form className="flex flex-col gap-6" onSubmit={handleLogin}>
          <input
            type="number"
            name="mobile"
            placeholder="Enter mobile number"
            value={loginInfo.mobile}
            onChange={(event) => handleChange(event, 10)}
            onKeyDown={(event) => forbidChars(event)}
            onPaste={(event) => forbidChars(event)}
            disabled={!otpStatus}
            className="login-input disabled:cursor-not-allowed disabled:opacity-50"
            required
          />
          {otpStatus ? (
            <LargeBtn>
              {loading ? <Spinner className="h-7 w-7" /> : "Send OTP"}
            </LargeBtn>
          ) : null}
        </form>

        <div>
          {alertInfo.message}
          {alertInfo.type == "success" && (
            <i className="fa-solid fa-circle-check ml-2 text-green"></i>
          )}
          {alertInfo.type == "error" && (
            <i className="fa-solid fa-circle-xmark ml-2 text-secondary"></i>
          )}
        </div>

        {!otpStatus && (
          <form className="flex flex-col gap-6" onSubmit={handleVerify}>
            <div className="flex gap-4">
              <OtpField
                quantity={6}
                inputData={inputData}
                inputOnChange={handleChange}
              />
            </div>
            <LargeBtn>
              {loading ? <Spinner className="h-7 w-7" /> : "LOGIN"}
            </LargeBtn>
          </form>
        )}
      </div>
    </div>
  );
}
