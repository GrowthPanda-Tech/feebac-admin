import CouponToggle from "./CouponToggle";

export default function CouponCard({ data, setCouponsData }) {
    console.log(data);
    return (
        <>
            <div
                className={` relative flex   bg-white rounded-xl shadow-xl flex-col  `}
            >
                {!data.isActive && (
                    <h2 className=" text-2xl text-white z-10 absolute top-[50%]  left-[36%]">
                        Disabled
                    </h2>
                )}

                <div
                    className={`bg rounded-lg ${
                        data.isActive ? "" : "disable-filter"
                    } `}
                >
                    <div className="absolute top-1 right-2 p-2">
                        <CouponToggle
                            couponId={data.id}
                            couponInfo={data}
                            setCouponsData={setCouponsData}
                        />
                        {/* <i className="fa-solid fa-ellipsis-vertical"></i> */}
                    </div>

                    <div className=" card-img flex items-center justify-center">
                        <img className=" w-52" src={data.imageUrl} alt="" />
                    </div>

                    <div className="pb-10">
                        <h2 className="text-black pl-6 text-2xl font-semibold">
                            {data.title}
                        </h2>
                        <div className="flex pl-6 flex-grow flex-col gap-2 font-medium">
                            <h2>{data.description}</h2>
                            <span className="gap-2">
                                <i className="  pr-2 fa-regular fa-clock"></i>
                                valid till {data.expiredData}
                            </span>
                            <div className=" flex bg-[#5927E8] w-24 rounded-full items-center justify-evenly text-white ">
                                <i className="fa-solid fa-coins p-2"></i>
                                <h2 className=" p-2">{data.value}</h2>
                            </div>
                            {/* {data.details.map((item, index) => {
                                return <span key={index}>{item}</span>;
                            })}
                            {data.tnc.map((item, index) => {
                                return <span key={index}>{item}</span>;
                            })} */}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
