import React, { useState } from "react";
import { useEffect } from "react";

function formatDate(inputDate) {
    const date = new Date(inputDate);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");

    return `${year}/${month}/${day} ${hours}:${minutes}:${seconds}`;
}

export function DateSelect({ setAddCouponData }) {
    let date = new Date();
    date.setDate(date.getDate() + 7);
    let todayDate = date.toDateString();
    const [selectedOption, setSelectedOption] = useState();

    const generateDateOptions = () => {
        const today = new Date();
        const options = [
            { label: "1 Week", value: 7 },
            { label: "2 Week", value: 14 },
            { label: "3 Week", value: 21 },
            { label: "1 Month", value: 30 },
            { label: "3 Months", value: 90 },
            { label: "6 Months", value: 180 },
            { label: "12 Months", value: 360 },
        ];

        return options.map((option) => {
            const date = new Date(today);
            date.setDate(today.getDate() + option.value);

            const newDate = date.toDateString();
            let formattedDate = formatDate(newDate);
            return (
                <option key={option.value} value={formattedDate}>
                    {option.label}
                </option>
            );
        });
    };

    useEffect(() => {
        setAddCouponData((prev) => ({
            ...prev,
            expiredData: formatDate(todayDate),
        }));
    }, []);

    const handleSelectChange = (event) => {
        setSelectedOption(event.target.value);
        setAddCouponData((prev) => ({
            ...prev,
            expiredData: event.target.value,
        }));
    };
    return (
        <div className="mb-2 flex items-center justify-between ">
            <label className="font-semibold mb-2">
                Select Coupon End Date:
            </label>
            <select
                value={selectedOption}
                onChange={handleSelectChange}
                className="px-2 py-2 ml-2 border input-article w-40 rounded-md"
            >
                {generateDateOptions()}
            </select>
        </div>
    );
}
