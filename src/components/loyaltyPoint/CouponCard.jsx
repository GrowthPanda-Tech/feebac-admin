import CouponToggle from "./CouponToggle";

export default function CouponCard({ data, setCouponsData }) {
    return (
        <>
            <div
                className={`relative flex ${
                    data.isActive ? "" : "disable-filter"
                } bg-white rounded-xl shadow-xl flex-col`}
            >
                {!data.isActive && (
                    <h2 className="text-2xl text-white z-10 absolute top-[50%] left-[36%]">
                        Disabled
                    </h2>
                )}

                <div className="rounded-lg">
                    <div className="absolute top-1 right-2 p-2">
                        <CouponToggle
                            couponId={data.id}
                            couponInfo={data}
                            setCouponsData={setCouponsData}
                        />
                    </div>

                    <div className="card-img flex items-center justify-center">
                        <img className=" w-52" src={data.imageUrl} alt="" />
                    </div>

                    <div className="py-10 px-6 flex flex-col gap-4">
                        <h2 className="text-black text-2xl font-semibold">
                            {data.title}
                        </h2>
                        <h2>{data.description}</h2>
                        <div className="flex gap-4">
                            <div>Total Created : {data.totalCount}</div>
                            <div>Total Redeemed : {data.redeemCount}</div>
                        </div>
                        <div className="flex bg-[#5927E8] w-24 p-2 rounded-full items-center justify-evenly text-white ">
                            <i className="fa-solid fa-coins"></i>
                            <h2>{data.value}</h2>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
