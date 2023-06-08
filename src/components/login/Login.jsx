import { useState } from 'react';
import loginBanner from '../../assets/loginBanner.png';
import makeRequest from '../../utils/makeRequest';

function OtpField({ quantity, inputData, inputOnChange }) {
    const list = [];
    for (let i = 0; i < quantity; i++) {
        list.push(
            <input
                type='text'
                maxLength={1}
                id={i + 1}
                key={i + 1}
                name={`i-${i}`}
                value={inputData[`i-${i}`]}
                onChange={inputOnChange}
                className='w-1/4 login-input text-center'
                required
            />
        )
    }
    return <> {list} </>;
}

function LargeBtn({ name, disabled }) {
    return (
        <button
            className='bg-primary disabled:bg-accent disabled:cursor-not-allowed hover:bg-accent text-white py-6 text-xl rounded-3xl'
            disabled={disabled}>
            {name}
        </button>
    );
}

export default function Login() {
    const [inputData, setInputData] = useState({});

    const inputOnChange = (e) => setInputData({ ...inputData, [e.target.name]: e.target.value });

    const [loginInfo, setLoginInfo] = useState({ mobile: "", otp: "" });
    const [alertInfo, setAlertInfo] = useState({ message: "", type: null });
    const [otpStatus, setOtpStatus] = useState(true);

    const onChange = (e) => setLoginInfo({ ...loginInfo, [e.target.name]: e.target.value });

    const handleLogin = async (e) => {
        e.preventDefault();

        // validate admin or not
        const isAdminResponse = await makeRequest(`site-admin/is-admin?mobile=${loginInfo.mobile}`, 'GET');

        if (isAdminResponse.isSuccess && isAdminResponse.isAdmin) {
            const jsonResponse = await makeRequest('auth/login', 'POST', loginInfo);
            setAlertInfo({ ...alertInfo, message: "OTP sent", type: "success" });
            if (jsonResponse.isSuccess) setOtpStatus(false);
        } else {
            setAlertInfo({ message: "You are not allowed to login here", type: "error" });
        }
    }

    const handleVerify = async (e) => {
        e.preventDefault();

        let otp = "";
        Object.values(inputData).forEach(element => {
            otp += element;
        });

        const response = await makeRequest('auth/verify-otp', 'POST', { ...loginInfo, otp: otp });
        if (response.isSuccess) {
            localStorage.setItem("authToken", response.authToken);
            localStorage.setItem("userInfo", JSON.stringify(response.userInfo));
            location.replace("/");
        } else {
            setAlertInfo({ ...setAlertInfo, message: "OTP not matched.", type: "error" });
        }
    }

    return (
        <div className='flex w-full h-screen p-28 bg-white'>
            <div className='w-1/2'>
                <img src={loginBanner} alt='loading' />
            </div>

            {/* Separation bar */}
            <div className='w-0.5 bg-black'></div>

            <div className='w-1/2 flex flex-col px-16 gap-6 justify-center'>
                <div className='text-secondary text-3xl font-bold'>Login as Admin</div>

                <form className='flex flex-col gap-6' onSubmit={handleLogin}>
                    <input
                        type='number'
                        name='mobile'
                        placeholder='Enter mobile number'
                        value={loginInfo.mobile}
                        onChange={onChange}
                        disabled={!otpStatus}
                        className='login-input disabled:cursor-not-allowed'
                        required 
                    />
                    <LargeBtn name={'Send OTP'} disabled={!otpStatus} />
                </form>

                <form className='flex flex-col gap-6' onSubmit={handleVerify}>
                    <div className='flex gap-4'>
                        <OtpField quantity={4} inputData={inputData} inputOnChange={inputOnChange} />
                    </div>
                    <LargeBtn name={'LOGIN'} />
                </form>

                {/* TODO: fix the shifting of the entire form up due to this */}
                <div>
                    {alertInfo.message}
                    {alertInfo.type == 'success' && <i className='fa-solid fa-circle-check ml-2 text-green'></i>}
                    {alertInfo.type == 'error' && <i className='fa-solid fa-circle-xmark ml-2 text-secondary'></i>}
                </div>
            </div>
        </div>
    );
}
