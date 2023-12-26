import React, { useState, useRef, useEffect } from "react";
import EditCoupons from "./EditCoupons";
import CouponToggle from "./CouponToggle";

export default function Card({ data, setCouponsData, setLoading }) {
  const [menuVisible, setMenuVisible] = useState(false);
  const menuRef = useRef();
  const [editPop, setEditPop] = useState(false);

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  const handleOutsideClick = (e) => {
    if (menuRef.current && !menuRef.current.contains(e.target)) {
      setMenuVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  const cardClasses = `bg-white rounded-xl ${
    !data.isActive ? "disabled-card" : ""
  }`;

  return (
    <>
      {editPop && (
        <EditCoupons
          id={data.id}
          setCouponsData={setCouponsData}
          setEditPop={setEditPop}
          setLoading={setLoading}
        />
      )}

      <div className={cardClasses}>
        <div className="relative">
          <button
            onClick={toggleMenu}
            className="absolute right-2 top-2 cursor-pointer p-2 text-gray-600 hover:text-gray-800 focus:outline-none"
          >
            <i class="fa-solid fa-ellipsis-vertical"></i>
          </button>
          {menuVisible && (
            <div
              ref={menuRef}
              className="absolute right-2 top-8 z-10 rounded-lg border bg-white shadow-md"
            >
              <div className="flex flex-col">
                <button
                  className="block w-full px-4 py-2 text-left "
                  onClick={() => {
                    setEditPop(true);
                    setMenuVisible(false);
                  }}
                >
                  Edit
                </button>
                <CouponToggle
                  couponId={data.id}
                  couponInfo={data}
                  setCouponsData={setCouponsData}
                />
              </div>
            </div>
          )}
        </div>

        <div className="flex flex-col">
          <div className="rounded-lg">
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
                </div>
              </div>
              <div className="flex w-24 items-center justify-evenly rounded-full bg-[#5927E8] p-2 text-white">
                <i className="fa-solid fa-coins"></i>
                <h2>{data.value}</h2>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
