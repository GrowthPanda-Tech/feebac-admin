import React from "react";
import CouponCard from "./CouponCard";
import { useState } from "react";
import { useEffect } from "react";
import makeRequest from "../../utils/makeRequest";
import AddCoupons from "./AddCoupons";
function Coupons() {
    const [couponData, setCouponsData] = useState([]);
    const [showCouponAddPop, setShowCouponAddPop] = useState(false);

    const getData = async () => {
        const response = await makeRequest(`loyalty/get-all-coupons`, "GET");
        if (response.isSuccess) {
            setCouponsData(response.data);
        }
    };

    console.log(couponData);

    useEffect(() => {
        getData();
    }, []);
    return (
        <>
            <div className=" flex justify-end">
                <button
                    className="btn-primary"
                    onClick={() => {
                        setShowCouponAddPop(true);
                    }}
                >
                    Add Coupons
                </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-20">
                {couponData.map((data, index) => (
                    <CouponCard
                        key={index}
                        data={data}
                        setCouponsData={setCouponsData}
                    />
                ))}
            </div>

            {showCouponAddPop && (
                <AddCoupons
                    setShowCouponAddPop={setShowCouponAddPop}
                    setCouponsData={setCouponsData}
                />
            )}
        </>
    );
}

export default Coupons;
