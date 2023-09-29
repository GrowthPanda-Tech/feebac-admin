import { React, useState } from "react";
import PageTitle from "../PageTitle";
import convertToUTC from "../../utils/convertToUTC";
import makeRequest from "../../utils/makeRequest";
import AlertComponent from "../AlertComponent/AlertComponent";
import { DateSelect } from "./DateSelect";
import { TermsAndCondition } from "./TermsAndCondition";
import { CouponsDetails } from "./CouponsDescription";

const TODAY = new Date().toISOString().slice(0, 16);

function InputForm({ label, name, value, onChange, type }) {
    return (
        <div className="pb-6">
            <label className="font-semibold text-gray-700 block pb-1">
                {label}
            </label>
            <div className="flex">
                <input
                    name={name}
                    type={type}
                    className="border-2  input-article  rounded-r px-4 py-2 w-full"
                    value={value}
                    onChange={onChange}
                />
            </div>
        </div>
    );
}
function AddCoupons({ setShowCouponAddPop, setCouponsData }) {
    const [addCouponData, setAddCouponData] = useState({});

    const handleChange = (e) => {
        setAddCouponData({ ...addCouponData, [e.target.name]: e.target.value });
    };

    console.log(addCouponData);

    const handleSubmit = async () => {
        const response = await makeRequest(
            "/loyalty/add-coupon",
            "POST",
            addCouponData
        );

        if (response.isSuccess) {
            AlertComponent("success", response);
            const getData = async () => {
                const response = await makeRequest(
                    `loyalty/get-all-coupons`,
                    "GET"
                );
                if (response.isSuccess) {
                    setCouponsData(response.data);
                }
            };
            setShowCouponAddPop(false);
            getData();
        } else {
            AlertComponent("failed", response);
        }
    };
    return (
        <div className="fixed top-0 left-0 w-full flex justify-center overflow-y-scroll items-center update-user h-[100vh] ">
            <div className="bg-white w-[50%] p-5">
                <PageTitle name={"Add Coupons"} />
                <InputForm
                    label={"Title"}
                    name={"title"}
                    onChange={handleChange}
                />
                <InputForm
                    label={"Description"}
                    name={"description"}
                    onChange={(e) => {
                        handleChange(e);
                    }}
                />
                <InputForm
                    label={"Voucher Value "}
                    name={"value"}
                    type={"number"}
                    onChange={(e) => {
                        handleChange(e);
                    }}
                />

                <label className="flex flex-col pb-6">
                    <span className="font-semibold mb-2">Image link :</span>
                    <input
                        name="imageUrl"
                        type="url"
                        placeholder="https://example.com"
                        pattern="https://.*"
                        className="border-2  input-article  rounded-r px-4 py-2 w-full"
                        onChange={handleChange}
                        required
                    />
                </label>
                <DateSelect setAddCouponData={setAddCouponData} />
                {/* <label className="flex flex-col pb-6">
                    <span className="font-semibold mb-2">End Date :</span>

                    <input
                        type={"datetime-local"}
                        min={TODAY}
                        name={"expiredData"}
                        onChange={handleChange}
                        className="border-2  input-article  rounded-r px-4 py-2  h-fit w-full"
                        required
                    />
                </label> */}

                <div className="flex flex-col  justify-between">
                    <TermsAndCondition setAddCouponData={setAddCouponData} />
                    <CouponsDetails setAddCouponData={setAddCouponData} />
                </div>

                <div className=" flex p-3 gap-3">
                    <button className="btn-primary" onClick={handleSubmit}>
                        Save Changes
                    </button>
                    <button
                        onClick={() => {
                            setShowCouponAddPop(false);
                        }}
                        className="btn-secondary"
                    >
                        Cancle
                    </button>
                </div>
            </div>
        </div>
    );
}

export default AddCoupons;
