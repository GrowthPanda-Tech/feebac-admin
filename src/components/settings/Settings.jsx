import { useState, useEffect } from "react";

import makeRequest from "../../utils/makeRequest";

//components
import PageTitle from "../__helperComponents__/PageTitle";
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
  const [tertiaryKeys, setTertiaryKeys] = useState([]);
  const [filterVals, setFilterVals] = useState({
    dataType: 3,
    isSelect: true,
    options: [],
  });

  useEffect(() => {
    let ignore = false;

    async function getTertiaryKeys() {
      try {
        const response = await makeRequest(`config/get-profile-key-value`);

        if (!response.isSuccess) {
          throw new Error(response.message);
        }

        if (!ignore) {
          setTertiaryKeys(response.data[2].key);
        }
      } catch (error) {
        console.error(error);
      }
    }

    getTertiaryKeys();

    return () => {
      ignore = true;
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
        <CategoryForm setIsShowCategoryCreate={setIsShowCategoryCreate} />
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
