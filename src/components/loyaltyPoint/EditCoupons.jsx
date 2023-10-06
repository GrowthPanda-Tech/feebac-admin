import { useState } from "react";
import { DateSelect } from "./DateSelect";
import { TermsAndCondition } from "./TermsAndCondition";
import { CouponsDetails } from "./CouponsDescription";

import makeRequest from "../../utils/makeRequest";

import PageTitle from "../PageTitle";
import AlertComponent from "../AlertComponent/AlertComponent";
import CouponCategory from "./CouponCategory";
import { useEffect } from "react";

function InputForm({
    label,
    name,
    value,
    onChange,
    type,
    min,
    onKeyDown,
    onPaste,
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

function EditCoupons({ setEditPop, setCouponsData, id }) {
    const [editCouponData, setEditCouponData] = useState({});
    const [couponsDetails, setCouponsDetails] = useState("");
    const [couponsTermsCondition, setCouponsTermsCondition] = useState("");
    console.log(couponsDetails);

    function joinArrayWithNewlines(array) {
        const values = Object.values(array);
        return values.join("\n");
    }

    const handleChange = (e) => {
        if (e.target.name === "totalCount") {
            console.log(parseInt(e.target.value));
            setEditCouponData({
                ...editCouponData,
                totalCount: parseInt(e.target.value),
            });
            return;
        }
        setEditCouponData({
            ...editCouponData,
            [e.target.name]: e.target.value,
        });
    };

    const getCouponDetails = async () => {
        try {
            const response = await makeRequest(
                `/loyalty/get-coupon-details?id=${id}`,
                "GET"
            );
            if (response.isSuccess) {
                setEditCouponData(response.data);
                setCouponsDetails(joinArrayWithNewlines(response.data.details));
                setCouponsTermsCondition(
                    joinArrayWithNewlines(response.data.tnc)
                );
            }
        } catch (error) {}
    };

    useEffect(() => {
        getCouponDetails();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await makeRequest(
            "/loyalty/update-coupon",
            "PUT",
            editCouponData
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
            setEditPop(false);
            getData();
        } else {
            AlertComponent("failed", response);
        }
        console.log(couponsDetails);
    };
    return (
        <div className="fixed top-0 left-0 w-full flex justify-center overflow-y-scroll items-center update-user h-screen">
            <form onSubmit={handleSubmit}>
                <div className="bg-white w-full flex flex-col p-8 gap-4">
                    <PageTitle name={"Edit Coupons"} />
                    <InputForm
                        label={"Title"}
                        name={"title"}
                        value={editCouponData ? editCouponData.title : ""}
                        onChange={handleChange}
                    />
                    <InputForm
                        label={"Value in ₹"}
                        name={"description"}
                        value={editCouponData ? editCouponData.description : ""}
                        onChange={(e) => {
                            handleChange(e);
                        }}
                        min={0}
                        type={"number"}
                        onKeyDown={(e) => removeForbiddenChars(e)}
                        onPaste={(e) => removeForbiddenChars(e)}
                    />
                    <InputForm
                        label={"Points Required"}
                        name={"value"}
                        value={editCouponData ? editCouponData.value : ""}
                        type={"number"}
                        onChange={(e) => {
                            handleChange(e);
                        }}
                        min={0}
                        onKeyDown={(e) => removeForbiddenChars(e)}
                        onPaste={(e) => removeForbiddenChars(e)}
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
                            value={
                                editCouponData ? editCouponData.imageUrl : ""
                            }
                            required
                        />
                    </label>
                    <div className="grid grid-cols-2 gap-2 w-full ">
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
                                value={
                                    editCouponData
                                        ? editCouponData.totalCount
                                        : ""
                                }
                                onKeyDown={(e) => removeForbiddenChars(e)}
                                onPaste={(e) => removeForbiddenChars(e)}
                                min={1}
                            />
                        </div>
                        <CouponCategory
                            setAddCouponData={setEditCouponData}
                            selectedValueProp={
                                editCouponData ? editCouponData.category : ""
                            }
                        />
                        {/* <DateSelect setAddCouponData={setEditCouponData} /> */}
                    </div>

                    <div className="flex flex-col gap-4">
                        <CouponsDetails
                            setCouponData={setEditCouponData}
                            data={couponsDetails}
                        />
                        <TermsAndCondition
                            setCouponData={setEditCouponData}
                            data={couponsTermsCondition}
                        />
                    </div>

                    <div className="flex gap-4">
                        <button type="submit" className="btn-primary">
                            Save Changes
                        </button>
                        <button
                            onClick={() => {
                                setEditPop(false);
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

export default EditCoupons;
