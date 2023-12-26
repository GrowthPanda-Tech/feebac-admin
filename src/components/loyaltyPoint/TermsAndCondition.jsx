import { useState, useEffect } from "react";

export function TermsAndCondition({ setCouponData, data }) {
  const [text, setText] = useState("");

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      setText((prevText) => prevText + "\n");
      setCouponData((prev) => ({
        ...prev,
        tnc: text,
      }));
    }
  };

  useEffect(() => {
    setCouponData((prev) => ({
      ...prev,
      tnc: data,
    }));
    setText(data);
  }, [data]);
  return (
    <>
      <label className="flex flex-col pb-1 font-semibold text-gray-700">
        Terms And Condition
        <textarea
          rows="5"
          cols="40"
          value={text}
          className="input-article  rounded-lg  border-2 px-4 py-2 "
          onChange={(e) => {
            setText(e.target.value);
            setCouponData((prev) => ({
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
