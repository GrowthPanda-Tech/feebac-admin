import { useState, useEffect } from "react";
import PageTitle from "../PageTitle";
import LoyaltyPoint from "./LoyaltyPoint";
import Coupons from "./Coupons";

const BASE_URL = import.meta.env.VITE_BASE_URL;

function Pill({ section, isActive, onClick }) {
    return (
        <div
            className={`cursor-pointer ${
                isActive ? "pill-primary" : "pill-secondary"
            }`}
            onClick={onClick}
        >
            {section}
        </div>
    );
}

export default function Loyalty() {
    const [visibleSection, setVisibleSection] = useState("Points Management");

    return (
        <div className="flex flex-col gap-6">
            <div className="md:flex md:justify-between items-center">
                <PageTitle name={"Loyalty & Coupons Metrics"} />
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
            </div>

            {visibleSection === "Points Management" ? <LoyaltyPoint /> : null}

            {visibleSection === "Voucher Management" ? <Coupons /> : null}
        </div>
    );
}
