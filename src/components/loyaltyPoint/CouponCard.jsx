import { useState } from "react";
import CouponToggle from "./CouponToggle";
import EditCoupons from "./EditCoupons";

export default function CouponCard({ data, setCouponsData, setLoading }) {
  const [editPop, setEditPop] = useState(false);

  return (
    <>
      <div className="flex flex-col">
        <div className=" flex items-center justify-between px-2">
          <div className="tool-tip-div group">
            <button
              className=""
              onClick={() => {
                setEditPop(true);
              }}
            >
              <i className="fa-solid fa-pen-to-square"></i>
            </button>
            <span
              className={`tool-tip-span btn-primary -top-10  left-0 ${
                !data.isActive ? " bg-grey text-black brightness-100" : ""
              }`}
            >
              Edit Coupon
            </span>
          </div>
          {/* <CouponToggle
                        couponId={data.id}
                        couponInfo={data}
                        setCouponsData={setCouponsData}
                    /> */}
        </div>
        <div
          className={`relative flex ${
            data.isActive ? "" : "disable-filter"
          } flex-col rounded-xl bg-white shadow-xl`}
        >
          {!data.isActive && (
            <h2 className="absolute left-[36%] top-[50%] z-10 bg-white text-3xl text-black">
              Disabled
            </h2>
          )}

          <div className="rounded-lg">
            <div className="absolute right-2 top-1 p-2">
              <CouponToggle
                couponId={data.id}
                couponInfo={data}
                setCouponsData={setCouponsData}
              />
            </div>

            <div className="card-img flex items-center justify-center">
              <img className=" w-52" src={data.imageUrl} alt="" />
            </div>

            <div className="flex flex-col gap-4 px-6 py-10">
              <h2 className="text-2xl font-semibold text-black">
                {data.title}
              </h2>
              <div className="flex flex-grow flex-col gap-1 font-medium">
                <h2>{data.description}</h2>
                <div className="flex items-center gap-2">
                  <span>Redeemed : {data ? data.redeemCount : ""}</span>
                  <span>Total : {data ? data.totalCount : ""}</span>
                  {/* <span>
                                        Available :{" "}
                                        {data
                                            ? data.totalCount - data.redeemCount
                                            : ""}
                                    </span> */}
                </div>
              </div>
              <div className="flex w-24 items-center justify-evenly rounded-full bg-[#5927E8] p-2 text-white ">
                <i className="fa-solid fa-coins"></i>
                <h2>{data.value}</h2>
              </div>
            </div>
          </div>
        </div>
      </div>
      {editPop && (
        <EditCoupons
          id={data.id}
          setCouponsData={setCouponsData}
          setEditPop={setEditPop}
          setLoading={setLoading}
        />
      )}
    </>
  );
}
