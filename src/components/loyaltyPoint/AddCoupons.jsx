import { useState, useEffect } from "react";
import { DateSelect } from "./DateSelect";
import { TermsAndCondition } from "./TermsAndCondition";
import { CouponsDetails } from "./CouponsDescription";

import makeRequest from "../../utils/makeRequest";

import PageTitle from "../PageTitle";
import AlertComponent from "../AlertComponent/AlertComponent";
import CouponCategory from "./CouponCategory";
import removeForbiddenChars from "../../utils/removeForbiddenChars";

function InputForm({
    label,
    name,
    value,
    onChange,
    type,
    min,
    onKeyDown,
    onPaste,
    onwheel,
}) {
    return (
        <div>
            <label className="font-semibold text-gray-700 block pb-1">
                {label}
            </label>
            <input
                name={name}
                type={type}
                onKeyDown={onKeyDown}
                onWheel={onwheel}
                onPaste={onPaste}
                className="border-2 input-article rounded-md px-4 py-2 w-full"
                value={value}
                onChange={onChange}
                min={min}
                required
            />
        </div>
    );
}

function AddCoupons({ setShowCouponAddPop, setCouponsData, setLoading }) {
    const [addCouponData, setAddCouponData] = useState({});
    const [options, setOptions] = useState([]);

    const handleChange = (e) => {
        if (e.target.name === "description") {
            setAddCouponData({
                ...addCouponData,
                description: "₹" + e.target.value,
            });
            return;
        }
        if (e.target.name === "totalCount") {
            setAddCouponData({
                ...addCouponData,
                totalCount: parseInt(e.target.value),
            });
            return;
        }
        setAddCouponData({
            ...addCouponData,
            [e.target.name]: e.target.value,
        });
    };
    const getCouponsCategory = async () => {
        try {
            const response = await makeRequest(
                `/loyalty/get-coupon-category`,
                "GET"
            );
            if (!response.isSuccess) {
                throw new Error(response.message);
            }
            setOptions(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getCouponsCategory();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await makeRequest(
            "/loyalty/add-coupon",
            "POST",
            addCouponData
        );

        if (response.isSuccess) {
            setLoading(true);
            AlertComponent("success", response);
            const getData = async () => {
                const response = await makeRequest(
                    `loyalty/get-all-coupons`,
                    "GET"
                );
                if (response.isSuccess) {
                    setLoading(false);
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
                        label={"Value in ₹"}
                        name={"description"}
                        onChange={(e) => {
                            handleChange(e);
                        }}
                        min={0}
                        onwheel={(e) => e.target.blur()}
                        type={"number"}
                        onKeyDown={(e) => removeForbiddenChars(e)}
                        onPaste={(e) => removeForbiddenChars(e)}
                    />
                    <InputForm
                        label={"Points Required"}
                        name={"value"}
                        type={"number"}
                        onChange={(e) => {
                            handleChange(e);
                        }}
                        onwheel={(e) => e.target.blur()}
                        onKeyDown={(e) => removeForbiddenChars(e)}
                        onPaste={(e) => removeForbiddenChars(e)}
                        min={0}
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
                    <div className="grid grid-cols-2 gap-2 text-center w-full ">
                        <div className="mb-2 flex items-center  gap-4">
                            <label className="font-semibold">
                                Enter Total Units
                            </label>
                            <InputForm
                                name={"totalCount"}
                                type={"number"}
                                onChange={(e) => {
                                    handleChange(e);
                                }}
                                onwheel={(e) => e.target.blur()}
                                onKeyDown={(e) => removeForbiddenChars(e)}
                                onPaste={(e) => removeForbiddenChars(e)}
                                min={1}
                            />
                        </div>

                        <CouponCategory
                            options={options}
                            setOptions={setOptions}
                            setAddCouponData={setAddCouponData}
                        />
                        {/* <DateSelect setAddCouponData={setAddCouponData} /> */}
                    </div>

                    <div className="flex flex-col gap-4">
                        <CouponsDetails setCouponData={setAddCouponData} />
                        <TermsAndCondition setCouponData={setAddCouponData} />
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
