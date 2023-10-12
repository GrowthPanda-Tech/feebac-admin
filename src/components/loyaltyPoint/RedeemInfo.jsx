import React from "react";
import PageTitle from "../PageTitle";
import { useParams } from "react-router-dom";
import makeRequest from "../../utils/makeRequest";
import { useState } from "react";
import { useEffect } from "react";
import AlertComponent from "../AlertComponent/AlertComponent";
import { useNavigate } from "react-router-dom";
function UserInfo({ name, value }) {
    return (
        <div className="flex justify-between">
            <h5 className="mb-2 text-xl font-semibold tracking-tight text-gray-900">
                {name}
            </h5>
            <p
                className={`mb-3 capitalize font-semibold opacity-50 text-gray-700 ${
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
            <h5 className="mb-3 font-bold text-xl">{name}</h5>
            <p className="mb-3 capitalize font-semibold opacity-50 ">{value}</p>
        </div>
    );
}

function RedeemInfo() {
    const navigate = useNavigate();
    const { slug } = useParams();
    const [redeemInfo, setRedeemInfo] = useState({
        coupon: {
            id: "",
            expiredData: "",
        },
    });
    const [message, setMessage] = useState("");

    const getRedeemInfo = async () => {
        try {
            const response = await makeRequest(
                `loyalty/get-request-info?id=${slug}`,
                "GET"
            );

            if (response.isSuccess) {
                setRedeemInfo(response.data);
            }
        } catch (error) {
            console.log(error);
        }
    };
    const onChangeHandler = (event) => {
        setMessage(event.target.value);
    };

    const onSubmitHandler = async () => {
        try {
            const body = {
                id: slug,
                message: message,
            };
            const response = await makeRequest(
                "loyalty/approve-request",
                "PUT",
                body
            );
            if (response.isSuccess) {
                AlertComponent("success", response);
                setTimeout(() => {
                    navigate(-1);
                }, 1500);
            }
        } catch (error) {}
    };

    useEffect(() => {
        getRedeemInfo();
    }, [slug]);
    return (
        <>
            <PageTitle name={"Redeem Information"} />
            {redeemInfo.currentStatus === "pending" ? (
                <div className="p-5 flex items-center gap-10  ">
                    <input
                        className="w-full p-5 rounded-lg"
                        placeholder="Enter the Requested Code Here..."
                        type="text"
                        onChange={onChangeHandler}
                    />
                    <button className="btn-primary" onClick={onSubmitHandler}>
                        Send
                    </button>
                </div>
            ) : (
                ""
            )}
            <div className="grid grid-cols-2 p-5 gap-10">
                <div className=" space-y-4">
                    <PageTitle name={"User Details"} />
                    <div className="flex flex-col gap-4 bg-white rounded-xl h-[40vh] justify-center p-8 w-full">
                        <UserInfo name={"Id"} value={slug} />
                        <UserInfo
                            name={"User Id"}
                            value={redeemInfo.requestBy}
                        />
                        <UserInfo
                            name={"Request Date"}
                            value={redeemInfo.createdDate}
                        />
                        <UserInfo
                            name={"Status"}
                            value={redeemInfo.currentStatus}
                        />
                        {redeemInfo.currentStatus === "approved" ? (
                            <>
                                <UserInfo
                                    name={"Message"}
                                    value={redeemInfo.message}
                                />
                                <UserInfo
                                    name={"Approved By"}
                                    value={redeemInfo.approvedBy}
                                />
                            </>
                        ) : (
                            ""
                        )}
                    </div>
                </div>
                <div className=" space-y-4">
                    <PageTitle name={"Coupons Details"} />

                    <div className="flex flex-col items-center p-10 h-[40vh] bg-white justify-center rounded-xl ">
                        <img
                            className="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 "
                            src={redeemInfo.coupon.imageUrl}
                            alt=""
                        />
                        <div className="flex flex-col justify-between w-full p-4 leading-normal">
                            {/* <CouponInfo
                                name={"Coupon Id"}
                                value={redeemInfo?.coupon?.id.split("-").pop()}
                            /> */}
                            <CouponInfo
                                name={"Name"}
                                value={redeemInfo.coupon.title}
                            />
                            <CouponInfo
                                name={"Value"}
                                value={redeemInfo.coupon.description}
                            />
                            <CouponInfo
                                name={"Category"}
                                value={redeemInfo.coupon.category}
                            />
                            <CouponInfo
                                name={"Coins Requried"}
                                value={redeemInfo.coupon.value}
                            />
                            {/* <CouponInfo
                                name={"Expired Date"}
                                value={
                                    redeemInfo.coupon.expiredData.split(" ")[0]
                                }
                            /> */}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default RedeemInfo;
