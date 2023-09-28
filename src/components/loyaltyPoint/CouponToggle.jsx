import React, { useState } from "react";
import "./couponToggle.css";
import { useEffect } from "react";
import makeRequest from "../../utils/makeRequest";

function CouponToggle({ couponInfo, couponId, setCouponsData }) {
    const [isActive, setIsActive] = useState();

    const handleToggle = async () => {
        const body = {
            id: couponId,
        };
        const response = await makeRequest(
            "/loyalty/toggle-coupon-status",
            "PATCH",
            body
        );
        if (response.isSuccess) {
            setIsActive(!isActive);
            const getData = async () => {
                const response = await makeRequest(
                    `loyalty/get-all-coupons`,
                    "GET"
                );
                if (response.isSuccess) {
                    setCouponsData(response.data);
                }
            };
            getData();
        }
    };

    console.log(isActive);
    useEffect(() => {
        setIsActive(couponInfo?.isActive);
    }, [couponInfo]);

    return (
        <div className="toggle-container">
            <label className="slider-label">
                {/* {isActive ? "Active" : "In-Active"} */}
            </label>
            <div
                className={`slider ${isActive ? "active" : "in-active"}`}
                onClick={handleToggle}
            >
                <div className="slider-thumb"></div>
            </div>
        </div>
    );
}

export default CouponToggle;
