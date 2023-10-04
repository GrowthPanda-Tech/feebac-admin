import React, { useState, useEffect } from "react";
import makeRequest from "../../utils/makeRequest";

const CouponCategory = ({ setAddCouponData }) => {
    const [options, setOptions] = useState([]);
    const [selectedValue, setSelectedValue] = useState(null);

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

    console.log(options);

    useEffect(() => {
        getCouponsCategory();
    }, []);

    const handleChange = (event) => {
        setSelectedValue(event.target.value);
        setAddCouponData((prev) => ({
            ...prev,
            category: event.target.value,
        }));
    };

    return (
        <div className="mb-2 flex items-center justify-between ">
            <label className="font-semibold mb-2">
                Select Category for Coupon
            </label>
            <select
                className="px-2 py-2 ml-2 border input-article w-40  rounded-md"
                value={selectedValue}
                onChange={handleChange}
            >
                <option value="">Select option</option>
                {options.map((option) => (
                    <option key={option.id} value={option.id}>
                        {option.name}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default CouponCategory;
