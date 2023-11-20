import React from "react";
import CouponCard from "./CouponCard";
import { useState } from "react";
import { useEffect } from "react";
import makeRequest from "../../utils/makeRequest";
import AddCoupons from "./AddCoupons";
import Skeleton from "react-loading-skeleton";
import CardSkeleton from "../_helperComponents/CardSkeleton";
import Card from "./Card";
function Coupons() {
  const [couponData, setCouponsData] = useState([]);
  const [showCouponAddPop, setShowCouponAddPop] = useState(false);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState("active");

  const handleStatusChange = () => {
    setStatus(status === "active" ? "inactive" : "active");
  };

  const handleEditClick = () => {
    // Handle edit action
  };

  useEffect(() => {
    let ignore = false;

    async function getData() {
      try {
        const response = await makeRequest(`loyalty/get-all-coupons`, "GET");

        if (!response.isSuccess) {
          throw new Error(json.message);
        }

        if (!ignore) {
          setCouponsData(response.data);
          setLoading(false);
        }
      } catch (error) {
        if (error.message == 204) {
          setCouponsData([]);
          setLoading(false);
        }
      }
    }

    getData();

    return () => {
      ignore = true;
    };
  }, []);

  return (
    <>
      <div className=" flex justify-end">
        <button
          className="btn-primary"
          onClick={() => {
            setShowCouponAddPop(true);
          }}
        >
          Add Coupons
        </button>
      </div>

      {loading && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-20">
          <CardSkeleton card={6} />
        </div>
      )}

      {couponData.length === 0 ? (
        <div className="flex h-[60vh] font-semibold text-2xl justify-center items-center">
          No Coupons Avaiable !! Add new
        </div>
      ) : (
        ""
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-20">
        {couponData.map((data, index) => (
          <Card
            key={index}
            data={data}
            setCouponsData={setCouponsData}
            setLoading={setLoading}
          />
        ))}
      </div>

      {showCouponAddPop && (
        <AddCoupons
          setShowCouponAddPop={setShowCouponAddPop}
          setCouponsData={setCouponsData}
          setLoading={setLoading}
        />
      )}
    </>
  );
}

export default Coupons;
