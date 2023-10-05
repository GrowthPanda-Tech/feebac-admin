import { useState } from "react";
import { DateSelect } from "./DateSelect";
import { TermsAndCondition } from "./TermsAndCondition";
import { CouponsDetails } from "./CouponsDescription";

import makeRequest from "../../utils/makeRequest";

import PageTitle from "../PageTitle";
import AlertComponent from "../AlertComponent/AlertComponent";
import CouponCategory from "./CouponCategory";

function InputForm({ label, name, value, onChange, type }) {
    return (
        <div>
            <label className="font-semibold text-gray-700 block pb-1">
                {label}
            </label>
            <input
                name={name}
                type={type}
                className="border-2 input-article rounded-md px-4 py-2 w-full"
                value={value}
                onChange={onChange}
                required
            />
        </div>
    );
}

function AddCoupons({ setShowCouponAddPop, setCouponsData }) {
    const [addCouponData, setAddCouponData] = useState({});

    const handleChange = (e) => {
        setAddCouponData({ ...addCouponData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("hii");
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
        <div className="fixed top-0 left-0 w-full flex justify-center overflow-y-scroll items-center update-user h-screen">
            <form onSubmit={handleSubmit}>
                <div className="bg-white w-full flex flex-col p-8 gap-4">
                    <PageTitle name={"Add Coupons"} />
                    <InputForm
                        label={"Title"}
                        name={"title"}
                        onChange={handleChange}
                    />
                    <InputForm
                        label={"Value"}
                        name={"description"}
                        onChange={(e) => {
                            handleChange(e);
                        }}
                    />
                    <InputForm
                        label={"Points Required"}
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
                            className="border-2 input-article rounded-md px-4 py-2 w-full"
                            onChange={handleChange}
                            required
                        />
                    </label>
                    <div className="grid grid-cols-2 gap-2 w-full ">
                        <CouponCategory setAddCouponData={setAddCouponData} />
                        <DateSelect setAddCouponData={setAddCouponData} />
                    </div>

                    <div className="flex flex-col gap-4">
                        <CouponsDetails setAddCouponData={setAddCouponData} />
                        <TermsAndCondition
                            setAddCouponData={setAddCouponData}
                        />
                    </div>

                    <div className="flex gap-4">
                        <button type="submit" className="btn-primary">
                            Add Coupons
                        </button>
                        <button
                            onClick={() => {
                                setShowCouponAddPop(false);
                            }}
                            className="btn-secondary"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default AddCoupons;
