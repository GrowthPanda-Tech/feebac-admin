import React, { useState } from "react";

export function CouponsDetails({ setAddCouponData }) {
    const [couponsDetails, setCouponsDetails] = useState("");

    const handleKeyPress = (event) => {
        if (event.key === "Enter") {
            event.preventDefault();
            setCouponsDetails((prevText) => prevText + "\n");
            setAddCouponData((prev) => ({
                ...prev,
                details: couponsDetails,
            }));
        }
    };

    console.log();

    return (
        <>
            <label className="font-semibold text-gray-700 flex flex-col pb-1">
                Enter Coupons Details
                <textarea
                    rows="5"
                    cols="40"
                    value={couponsDetails}
                    className="border-2  input-article  rounded-lg px-4 py-2 "
                    onChange={(e) => {
                        setCouponsDetails(e.target.value);
                        setAddCouponData((prev) => ({
                            ...prev,
                            details: e.target.value,
                        }));
                    }}
                    onKeyDown={handleKeyPress}
                    required
                />
            </label>
        </>
    );
}
