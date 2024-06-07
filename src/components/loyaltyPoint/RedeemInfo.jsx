import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useFetch from "../../hooks/useFetch";

import makeRequest from "../../utils/makeRequest";
import swal from "../../utils/swal";

import LoadingSpinner from "../__helperComponents__/LoadingSpinner";

function UserInfo({ name, value }) {
  return (
    <div className="flex justify-between">
      <h5 className="text-xl font-semibold tracking-tight text-gray-900">
        {name}
      </h5>
      <p
        className={`font-semibold capitalize text-gray-700 opacity-50 ${
          value === "pending" ? `text-[#ff0000]` : ""
        } ${value === "approved" ? `text-green` : ""}`}
      >
        {value}
      </p>
    </div>
  );
}

function CouponInfo({ name, value }) {
  return (
    <div className="flex justify-between">
      <h5 className="text-xl font-semibold tracking-tight text-gray-900">
        {name}
      </h5>
      <p className="font-semibold capitalize text-gray-700 opacity-50">
        {value}
      </p>
    </div>
  );
}

export default function RedeemInfo() {
  const { slug } = useParams();
  const navigate = useNavigate();

  const { loading, fetchedData } = useFetch(
    `loyalty/get-request-info?id=${slug}`,
  );

  const [redeemCouponData, setRedeemCouponData] = useState({
    message: "",
    couponCode: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setRedeemCouponData({
      ...redeemCouponData,
      [name]: value,
    });
  };

  const handleSubmit = async () => {
    try {
      const response = await makeRequest("loyalty/approve-request", "PUT", {
        ...redeemCouponData,
        id: slug,
      });

      if (!response.isSuccess) {
        throw new Error(response.message);
      }

      swal("success", response.message);
      navigate(-1);
    } catch (error) {
      swal("error", error.message);
    }
  };

  const isButtonDisabled =
    !redeemCouponData.message || !redeemCouponData.couponCode;

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-semibold">Redeem Information</h1>
      {fetchedData?.data.status === "pending" ? (
        <div className="flex flex-col gap-6">
          <label className="font-semibold">
            <span className="text-lg">Message</span>
            <input
              name="message"
              className="mt-2 w-full rounded-lg p-5"
              placeholder="Hola!!"
              type="text"
              onChange={(e) => {
                handleChange(e);
              }}
            />
          </label>

          <label className="font-semibold">
            <span className="text-lg">Coupon Code</span>
            <input
              name="couponCode"
              className="mt-2 w-full rounded-lg p-5"
              placeholder="XXX-XXXX-XXX"
              type="text"
              onChange={(e) => {
                handleChange(e);
              }}
            />
          </label>

          <button
            className={` ${
              isButtonDisabled ? "btn-secondary" : "btn-primary"
            }  w-28`}
            onClick={handleSubmit}
            disabled={isButtonDisabled}
          >
            Send
          </button>
        </div>
      ) : (
        ""
      )}
      <div className="flex gap-10">
        <div className="flex w-1/2 flex-col gap-4">
          <span className="text-lg font-semibold">User Details</span>
          <div className="flex flex-col justify-center gap-4 rounded-xl bg-white p-8">
            <UserInfo name={"Id"} value={slug} />
            <UserInfo name={"User Id"} value={fetchedData?.data.requestBy} />
            <UserInfo name={"Status"} value={fetchedData?.data.status} />
            {fetchedData?.data.status === "approved" ? (
              <>
                <UserInfo name={"Message"} value={fetchedData?.data.message} />
                <UserInfo name={"Code"} value={fetchedData?.data.couponCode} />
                <UserInfo
                  name={"Approved By"}
                  value={fetchedData?.data.approvedBy}
                />
              </>
            ) : (
              ""
            )}
          </div>
        </div>
        <div className="flex w-1/2 flex-col gap-4">
          <span className="text-lg font-semibold">Coupon Details</span>

          <div className="flex flex-col items-center justify-center gap-4 rounded-xl bg-white p-8 ">
            <img
              className="h-96 w-full rounded-t-lg object-cover md:h-auto md:w-48 "
              src={fetchedData?.data.coupon.imageUrl}
              alt=""
            />
            <div className="flex w-full flex-col justify-between gap-4 leading-normal">
              <CouponInfo
                name={"Name"}
                value={fetchedData?.data.coupon.title}
              />
              <CouponInfo
                name={"Value"}
                value={fetchedData?.data.coupon.description}
              />
              <CouponInfo
                name={"Category"}
                value={fetchedData?.data.coupon.category.category_name}
              />
              <CouponInfo
                name={"Coins Required"}
                value={fetchedData?.data.coupon.value}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
