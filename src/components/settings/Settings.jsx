import { useState, useEffect } from "react";
import PageTitle from "../PageTitle";
import CategoryForm from "./CategoryForm";
import Categories from "./Categories";
import Profiles from "./filter/Profiles";
import FilterCreate from "./filter/FilterCreate";

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

export default function Settings() {
    const [isShowCategoryCreate, setIsShowCategoryCreate] = useState(false);
    const [isShowFilterCreate, setIsShowFilterCreate] = useState(false);
    const [visibleSection, setVisibleSection] = useState("category");
    const [tertiaryKeys, setTertiaryKeys] = useState([]);
    const [filterVals, setFilterVals] = useState({
        dataType: 6,
        isSelect: true,
        options: [],
    });

    console.log(isShowCategoryCreate, isShowFilterCreate, visibleSection);

    const handleShow = (section) => {
        if (section === "filter") {
            setIsShowFilterCreate(false);
        } else if (section === "filterVal") {
            setIsShowFilterCreate(true);
        } else {
            return;
        }
    };

    const getTertiaryKeys = async (request) => {
        try {
            const response = await fetch(
                `${BASE_URL}/config/get-profile-key-value`,
                request
            );

            if (!response.ok) {
                throw new Error(response.status);
            }

            const json = await response.json();

            if (!json.isSuccess) {
                throw new Error(response.message);
            }

            setTertiaryKeys(json.data[2].key);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        const controller = new AbortController();
        const signal = controller.signal;

        const request = {
            signal,
            headers: {
                authToken: localStorage.getItem("authToken"),
            },
        };

        getTertiaryKeys(request);

        return () => {
            controller.abort();
        };
    }, []);

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
                        onClick={() => handleShow("filterVal")}
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
                <FilterCreate
                    filterVals={filterVals}
                    setFilterVals={setFilterVals}
                    setTertiaryKeys={setTertiaryKeys}
                    setIsShowFilterCreate={setIsShowFilterCreate}
                />
            ) : null}

            {visibleSection === "category" ? (
                <Categories />
            ) : (
                <Profiles tertiaryKeys={tertiaryKeys} />
            )}
        </div>
    );
}
