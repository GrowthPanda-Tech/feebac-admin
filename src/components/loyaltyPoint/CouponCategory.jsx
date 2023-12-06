import { useState, useEffect } from "react";

export default function CouponCategory({
  setAddCouponData,
  options,
  selectedValueProp,
}) {
  const [selectedValue, setSelectedValue] = useState(selectedValueProp);

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
    setAddCouponData((prev) => ({
      ...prev,
      category: event.target.value,
    }));
  };
  useEffect(() => {
    const selectedOption = options.find(
      (option) => option.name === selectedValueProp
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
        className="px-2 py-2 ml-2 border input-article w-40  rounded-md"
        value={selectedValue}
        onChange={handleChange}
        required
      >
        <option value="">Select option</option>
        {options.map((option) => (
          <option key={option.id} value={option.id} className="capitalize">
            {option.category_name}
          </option>
        ))}
      </select>
    </div>
  );
}
