import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useFetch from "../../hooks/useFetch";

import makeRequest from "../../utils/makeRequest";
import dateConvert from "../../utils/dateConvert";
import swal from "../../utils/swal";

import LoadingSpinner from "../_helperComponents/LoadingSpinner";

function UserInfo({ name, value }) {
  return (
    <div className="flex justify-between">
      <h5 className="text-xl font-semibold tracking-tight text-gray-900">
        {name}
      </h5>
      <p
        className={`capitalize font-semibold opacity-50 text-gray-700 ${
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
      <p className="capitalize font-semibold opacity-50 text-gray-700">
        {value}
      </p>
    </div>
  );
}

export default function RedeemInfo() {
  const { slug } = useParams();
  const navigate = useNavigate();

  const { loading, fetchedData } = useFetch(
    `loyalty/get-request-info?id=${slug}`
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
              className="w-full p-5 rounded-lg mt-2"
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
              className="w-full p-5 rounded-lg mt-2"
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
        <div className="w-1/2 flex flex-col gap-4">
          <span className="text-lg font-semibold">User Details</span>
          <div className="flex flex-col gap-4 bg-white rounded-xl justify-center p-8">
            <UserInfo name={"Id"} value={slug} />
            <UserInfo name={"User Id"} value={fetchedData?.data.requestBy} />
            <UserInfo
              name={"Request Date"}
              value={dateConvert(fetchedData?.data.createdDate, "local")}
            />
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
        <div className="w-1/2 flex flex-col gap-4">
          <span className="text-lg font-semibold">Coupon Details</span>

          <div className="flex flex-col items-center p-8 gap-4 bg-white justify-center rounded-xl ">
            <img
              className="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 "
              src={fetchedData?.data.coupon.imageUrl}
              alt=""
            />
            <div className="flex flex-col justify-between w-full gap-4 leading-normal">
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
                value={fetchedData?.data.coupon.category.name}
              />
              <CouponInfo
                name={"Coins Requried"}
                value={fetchedData?.data.coupon.value}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
