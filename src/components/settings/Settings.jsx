import { useState } from "react";

//components
import PageTitle from "../_helperComponents/PageTitle";
import CategoryForm from "./CategoryForm";
import Categories from "./Categories";
import Profiles from "./filter/Profiles";
import FilterCreate from "./filter/FilterCreate";

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

export default function Settings() {
    const [isShowCategoryCreate, setIsShowCategoryCreate] = useState(false);
    const [isShowFilterCreate, setIsShowFilterCreate] = useState(false);
    const [visibleSection, setVisibleSection] = useState("category");

    return (
        <div className="flex flex-col gap-6">
            <div className="md:flex md:justify-between items-center">
                <PageTitle name={"Settings"} />
                {visibleSection === "category" ? (
                    <button
                        className="btn-primary"
                        onClick={() => setIsShowCategoryCreate(true)}
                    >
                        <i className="fa-solid fa-plus"></i>
                        Category
                    </button>
                ) : visibleSection === "filter" ? (
                    <button
                        className="btn-primary bg-accent"
                        onClick={() => setIsShowFilterCreate(true)}
                    >
                        <i className="fa-solid fa-plus"></i>
                        Filter
                    </button>
                ) : null}
            </div>

            <div className="flex gap-4">
                <Pill
                    section={"Categories"}
                    isActive={visibleSection === "category"}
                    onClick={() => setVisibleSection("category")}
                />
                <Pill
                    section={"Filters"}
                    isActive={visibleSection === "filter"}
                    onClick={() => setVisibleSection("filter")}
                />
            </div>

            {isShowCategoryCreate && visibleSection === "category" ? (
                <CategoryForm
                    setIsShowCategoryCreate={setIsShowCategoryCreate}
                />
            ) : null}

            {isShowFilterCreate && visibleSection === "filter" ? (
                <FilterCreate setIsShowFilterCreate={setIsShowFilterCreate} />
            ) : null}

            {visibleSection === "category" ? <Categories /> : <Profiles />}
        </div>
    );
}
