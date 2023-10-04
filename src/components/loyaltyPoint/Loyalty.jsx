import { useState, useEffect } from "react";
import PageTitle from "../PageTitle";
import LoyaltyPoint from "./LoyaltyPoint";
import Coupons from "./Coupons";
import RedeemRequest from "./RedeemRequest";
import makeRequest from "../../utils/makeRequest";
import { data } from "autoprefixer";

const BASE_URL = import.meta.env.VITE_BASE_URL;

function Pill({ section, isActive, onClick, lenghth }) {
    return (
        <div
            className={` relative cursor-pointer flex items-center justify-center gap-4 ${
                isActive ? "pill-primary" : "pill-secondary"
            }`}
            onClick={onClick}
        >
            {section}

            {section === "Redeem Request" ? (
                <span className=" absolute right-[-16px] top-[-16px] bg-secondary rounded-full text-white w-8 h-8 flex items-center justify-center">
                    {lenghth}
                </span>
            ) : (
                ""
            )}
        </div>
    );
}

export default function Loyalty() {
    const [visibleSection, setVisibleSection] = useState("Points Management");
    const [Data, setData] = useState([]);
    const [lenghth, setLength] = useState("");

    useEffect(() => {
        let ignore = false;

        async function fetchrRedeemData() {
            try {
                const response = await makeRequest(
                    `/loyalty/get-all-redeem-request?status=pending`
                );

                if (!response.isSuccess) {
                    throw new Error(json.message);
                }

                if (!ignore) {
                    setData(response.data);
                    setLength(response.data.length);
                }
            } catch (error) {
                console.error(error);
            }
        }

        fetchrRedeemData();

        return () => {
            ignore = true;
        };
    }, []);
    console.log(lenghth);

    return (
        <div className="flex flex-col gap-6">
            <div className="md:flex md:justify-between items-center">
                <PageTitle
                    name={
                        visibleSection === "Points Management"
                            ? "Points Management"
                            : visibleSection === "Voucher Management"
                            ? "Voucher Management"
                            : "Redeem Request"
                    }
                />
            </div>

            <div className="flex gap-4">
                <Pill
                    section={"Points Management"}
                    isActive={visibleSection === "Points Management"}
                    onClick={() => setVisibleSection("Points Management")}
                />
                <Pill
                    section={"Voucher Management"}
                    isActive={visibleSection === "Voucher Management"}
                    onClick={() => setVisibleSection("Voucher Management")}
                />
                <Pill
                    section={"Redeem Request"}
                    isActive={visibleSection === "Redeem Request"}
                    onClick={() => setVisibleSection("Redeem Request")}
                    lenghth={lenghth}
                />
            </div>

            {visibleSection === "Points Management" ? <LoyaltyPoint /> : null}
            {visibleSection === "Voucher Management" ? <Coupons /> : null}
            {visibleSection === "Redeem Request" ? <RedeemRequest /> : null}
        </div>
    );
}
