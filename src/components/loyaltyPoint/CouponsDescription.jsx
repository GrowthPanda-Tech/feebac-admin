import React, { useState, useEffect } from "react";

export function CouponsDetails({ setCouponData, data }) {
    const [couponsDetails, setCouponsDetails] = useState("");
    console.log(data);

    const handleKeyPress = (event) => {
        if (event.key === "Enter") {
            event.preventDefault();
            setCouponsDetails((prevText) => prevText + "\n");
            setCouponData((prev) => ({
                ...prev,
                details: couponsDetails,
            }));
        }
    };

    useEffect(() => {
        setCouponsDetails(data);
    }, [data]);
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
                        setCouponData((prev) => ({
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
