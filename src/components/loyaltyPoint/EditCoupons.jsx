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
}) {
  return (
    <div>
      <label className="block pb-1 font-semibold text-gray-700">{label}</label>
      <input
        name={name}
        type={type}
        onKeyDown={onKeyDown}
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

function EditCoupons({ setEditPop, setCouponsData, id, setLoading }) {
  const [editCouponData, setEditCouponData] = useState({});
  const [options, setOptions] = useState([]);

  function joinArrayWithNewlines(array) {
    const join = array.join("\n");
    return join;
  }

  const handleChange = (e) => {
    if (e.target.name === "description") {
      setEditCouponData({
        ...editCouponData,
        description: "₹" + e.target.value,
      });
      return;
    }
    if (e.target.name === "totalCount") {
      setEditCouponData({
        ...editCouponData,
        totalCount: parseInt(e.target.value),
      });
      return;
    }
    setEditCouponData({
      ...editCouponData,
      [e.target.name]: e.target.value,
    });
  };
  function removeCurrencySymbol(inputString) {
    if (inputString != undefined) return inputString.replace(/₹/g, "");
  }

  const getCouponDetails = async () => {
    try {
      const response = await makeRequest(
        `/loyalty/get-coupon-details?id=${id}`
      );
      if (response.isSuccess) {
        setEditCouponData(response.data);
        setEditCouponData({
          ...response.data,
          details: joinArrayWithNewlines(response.data.details),
          tnc: joinArrayWithNewlines(response.data.tnc),
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  const getCouponsCategory = async () => {
    try {
      const response = await makeRequest("loyalty/get-coupon-category");
      if (!response.isSuccess) {
        throw new Error(response.message);
      }
      setOptions(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getCouponsCategory();
    getCouponDetails();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await makeRequest(
      "/loyalty/update-coupon",
      "PUT",
      editCouponData
    );

    if (response.isSuccess) {
      setLoading(true);
      swal("success", response.message);
      const getData = async () => {
        const response = await makeRequest(`loyalty/get-all-coupons`, "GET");
        if (response.isSuccess) {
          setCouponsData(response.data);
          setLoading(false);
        }
      };
      setEditPop(false);
      getData();
    } else {
      swal("error", response.message);
    }
  };
  return (
    <div className="update-user fixed left-0 top-0 flex h-screen w-full items-center justify-center overflow-y-scroll">
      <form onSubmit={handleSubmit}>
        <div className="flex w-full flex-col gap-4 bg-white p-8">
          <PageTitle name={"Edit Coupons"} />
          <InputForm
            label={"Title"}
            name={"title"}
            value={editCouponData ? editCouponData.title : ""}
            onChange={handleChange}
          />
          <InputForm
            label={"Value in ₹"}
            name={"description"}
            value={
              editCouponData
                ? removeCurrencySymbol(editCouponData.description)
                : ""
            }
            onChange={(e) => {
              handleChange(e);
            }}
            min={0}
            type={"number"}
            onKeyDown={(e) => forbidChars(e)}
            onPaste={(e) => forbidChars(e)}
          />
          <InputForm
            label={"Points Required"}
            name={"value"}
            value={editCouponData ? editCouponData.value : ""}
            type={"number"}
            onChange={(e) => {
              handleChange(e);
            }}
            min={0}
            onKeyDown={(e) => forbidChars(e)}
            onPaste={(e) => forbidChars(e)}
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
              value={editCouponData ? editCouponData.imageUrl : ""}
              required
            />
          </label>
          <div className="grid w-full grid-cols-2 gap-2 ">
            <div className="mb-2 flex items-center  gap-4">
              <label className="font-semibold">Enter Total Units</label>
              <InputForm
                name={"totalCount"}
                type={"number"}
                onChange={(e) => {
                  handleChange(e);
                }}
                value={editCouponData ? editCouponData.totalCount : ""}
                onKeyDown={(e) => forbidChars(e)}
                onPaste={(e) => forbidChars(e)}
                min={1}
              />
            </div>
            {editCouponData && (
              <CouponCategory
                options={options}
                setOptions={setOptions}
                setAddCouponData={setEditCouponData}
                selectedValueProp={
                  editCouponData ? editCouponData.category : ""
                }
              />
            )}
            {/* <DateSelect setAddCouponData={setEditCouponData} /> */}
          </div>

          <div className="flex flex-col gap-4">
            <CouponsDetails
              setCouponData={setEditCouponData}
              data={editCouponData ? editCouponData.details : ""}
            />
            <TermsAndCondition
              setCouponData={setEditCouponData}
              data={editCouponData ? editCouponData.tnc : ""}
            />
          </div>

          <div className="flex gap-4">
            <button type="submit" className="btn-primary">
              Save Changes
            </button>
            <button
              onClick={() => {
                setEditPop(false);
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

export default EditCoupons;
