import { useState, useEffect } from "react";
import { TermsAndCondition } from "./TermsAndCondition";
import { CouponsDetails } from "./CouponsDescription";

import makeRequest from "../../utils/makeRequest";
import swal from "../../utils/swal";
import forbidChars from "../../utils/forbidChars";

import PageTitle from "../__helperComponents__/PageTitle";
import CouponCategory from "./CouponCategory";

function InputForm({
  label,
  name,
  value,
  onChange,
  type,
  min,
  onKeyDown,
  onPaste,
  onwheel,
}) {
  return (
    <div>
      <label className="block pb-1 font-semibold text-gray-700">{label}</label>
      <input
        name={name}
        type={type}
        onKeyDown={onKeyDown}
        onWheel={onwheel}
        onPaste={onPaste}
        className="input-article w-full rounded-md border-2 px-4 py-2"
        value={value}
        onChange={onChange}
        min={min}
        required
      />
    </div>
  );
}

function AddCoupons({ setShowCouponAddPop, setCouponsData, setLoading }) {
  const [addCouponData, setAddCouponData] = useState({});
  const [options, setOptions] = useState([]);

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    switch (name) {
      case "description":
        setAddCouponData({
          ...addCouponData,
          [name]: "₹" + value,
        });
        break;

      case "totalCount":
        setAddCouponData({
          ...addCouponData,
          [name]: parseInt(value),
        });
        break;

      default:
        setAddCouponData({
          ...addCouponData,
          [name]: value,
        });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await makeRequest(
      "/loyalty/add-coupon",
      "POST",
      addCouponData
    );

    if (response.isSuccess) {
      setLoading(true);
      swal("success", response.message);
      const getData = async () => {
        const response = await makeRequest("loyalty/get-all-coupons");
        if (response.isSuccess) {
          setLoading(false);
          setCouponsData(response.data);
        }
      };
      setShowCouponAddPop(false);
      getData();
    } else {
      swal("error", response.message);
    }
  };

  useEffect(() => {
    let ignore = false;

    const getCouponsCategory = async () => {
      try {
        const response = await makeRequest("loyalty/get-coupon-category");

        if (!response.isSuccess) {
          throw new Error(response.message);
        }

        if (!ignore) {
          setOptions(response.data);
        }
      } catch (error) {
        swal("error", error.message);
      }
    };

    getCouponsCategory();

    return () => {
      ignore = true;
    };
  }, []);

  return (
    <div className="update-user fixed left-0 top-0 flex h-screen w-full items-center justify-center overflow-y-scroll">
      <form onSubmit={handleSubmit}>
        <div className="flex w-full flex-col gap-4 bg-white p-8">
          <PageTitle name={"Add Coupons"} />
          <InputForm label={"Title"} name={"title"} onChange={handleChange} />
          <InputForm
            label={"Value in ₹"}
            name={"description"}
            onChange={(e) => {
              handleChange(e);
            }}
            min={0}
            onwheel={(e) => e.target.blur()}
            type={"number"}
            onKeyDown={(e) => forbidChars(e)}
            onPaste={(e) => forbidChars(e)}
          />
          <InputForm
            label={"Points Required"}
            name={"value"}
            type={"number"}
            onChange={(e) => {
              handleChange(e);
            }}
            onwheel={(e) => e.target.blur()}
            onKeyDown={(e) => forbidChars(e)}
            onPaste={(e) => forbidChars(e)}
            min={0}
          />
          <label className="flex flex-col pb-6">
            <span className="mb-2 font-semibold">Image link :</span>
            <input
              name="imageUrl"
              type="url"
              placeholder="https://example.com"
              pattern="https://.*"
              className="input-article w-full rounded-md border-2 px-4 py-2"
              onChange={handleChange}
              required
            />
          </label>
          <div className="grid w-full grid-cols-2 gap-2 text-center ">
            <div className="mb-2 flex items-center  gap-4">
              <label className="font-semibold">Enter Total Units</label>
              <InputForm
                name={"totalCount"}
                type={"number"}
                onChange={(e) => {
                  handleChange(e);
                }}
                onwheel={(e) => e.target.blur()}
                onKeyDown={(e) => forbidChars(e)}
                onPaste={(e) => forbidChars(e)}
                min={1}
              />
            </div>

            <CouponCategory
              options={options}
              setOptions={setOptions}
              setAddCouponData={setAddCouponData}
            />
          </div>

          <div className="flex flex-col gap-4">
            <CouponsDetails setCouponData={setAddCouponData} />
            <TermsAndCondition setCouponData={setAddCouponData} />
          </div>

          <div className="flex gap-4">
            <button type="submit" className="btn-primary">
              Add Coupons
            </button>
            <button
              onClick={() => {
                setShowCouponAddPop(false);
              }}
              className="btn-secondary"
            >
              Cancel
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default AddCoupons;
