import React, { useState } from "react";

export function TermsAndCondition({ setAddCouponData }) {
    const [text, setText] = useState("");

    const handleKeyPress = (event) => {
        if (event.key === "Enter") {
            console.log("hii");
            event.preventDefault();
            setText((prevText) => prevText + "\n");
            setAddCouponData((prev) => ({
                ...prev,
                tnc: text,
            }));
        }
    };

    console.log();

    return (
        <>
            <label className="font-semibold text-gray-700 flex flex-col pb-1">
                Terms And Condition
                <textarea
                    rows="5"
                    cols="40"
                    value={text}
                    className="border-2  input-article  rounded-lg px-4 py-2 "
                    onChange={(e) => {
                        setText(e.target.value);
                        setAddCouponData((prev) => ({
                            ...prev,
                            tnc: e.target.value,
                        }));
                    }}
                    onKeyDown={handleKeyPress}
                    required
                />
            </label>
        </>
    );
}
