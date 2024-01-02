import { useState, useEffect } from "react";

export default function CouponCategory({
  setAddCouponData,
  options,
  selectedValueProp,
}) {
  const [selectedValue, setSelectedValue] = useState(selectedValueProp);

  const handleChange = (event) => {
    const valueNum = parseInt(event.target.value);

    setSelectedValue(valueNum);
    setAddCouponData((prev) => ({
      ...prev,
      category: valueNum,
    }));
  };

  useEffect(() => {
    const selectedOption = options.find(
      (option) => option.name === selectedValueProp,
    );

    let selectedOptions = selectedOption
      ? selectedOption.id
      : selectedValueProp;

    setSelectedValue(selectedOptions);

    if (selectedOption !== undefined) {
      setAddCouponData((prev) => ({
        ...prev,
        category: selectedOption.id,
      }));
    }
  }, [selectedValueProp]);

  console.log(options);

  return (
    <div className="mb-2 flex items-center gap-4">
      <label className="font-semibold ">Select Category for Coupon</label>
      <select
        className="input-article ml-2 w-40 rounded-md border px-2 py-2 capitalize"
        value={selectedValue}
        onChange={handleChange}
        required
      >
        <option value="">Select option</option>
        {options.map((option) => (
          <option key={option.category_id} value={option.category_id}>
            {option.category_name}
          </option>
        ))}
      </select>
    </div>
  );
}
