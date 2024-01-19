import { useState } from "react";
import { useFilterContext } from "@/contexts/FilterContext";

//components
import PageTitle from "@helperComps/PageTitle";
import CategoryDelete from "@utilComps/CategoryDelete";
import CategoryForm from "./CategoryForm";
import Categories from "./Categories";
import Filter from "./filter/Filter";
import FilterCreate from "./filter/FilterCreate";

function Pill({ section, isActive, onClick }) {
  return (
    <div
      className={`cursor-pointer ${isActive ? "pill-primary" : "pill-secondary"
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
  const [filterVals, setFilterVals] = useState({
    dataType: 3,
    isSelect: true,
    options: [],
  });
  const [showDelete, setShowDelete] = useState(false);
  const [delIndex, setDelIndex] = useState(null);
  const [editIndex, setEditIndex] = useState(null);

  //tertiary profile keys
  const { fetchedData } = useFilterContext();
  const { data: filterData } = fetchedData || {};

  return (
    <div className="relative flex flex-col gap-6">
      <div className="items-center md:flex md:justify-between">
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

      {visibleSection === "category" ? (
        <Categories
          setIsShowCategoryCreate={setIsShowCategoryCreate}
          setEditIndex={setEditIndex}
          setShowDelete={setShowDelete}
          setDeleteIndex={setDelIndex}
        />
      ) : (
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          {filterData[2]?.key?.map(({ id, key_name, options }, index) => (
            <Filter
              key={id}
              id={id}
              keyName={key_name}
              options={options}
              filterIdx={index}
            />
          ))}
        </div>
      )}

      {isShowCategoryCreate && visibleSection === "category" ? (
        <div
          className={`update-user fixed left-0 top-0 flex h-[100vh] w-full items-center justify-center`}
        >
          <CategoryForm
            setIsShowCategoryCreate={setIsShowCategoryCreate}
            editIndex={editIndex}
            setEditIndex={setEditIndex}
          />
        </div>
      ) : null}

      {showDelete && visibleSection === "category" ? (
        <div
          className={`update-user fixed left-0 top-0 flex h-[100vh] w-full items-center justify-center`}
        >
          <CategoryDelete index={delIndex} setShowDelete={setShowDelete} />
        </div>
      ) : null}

      {isShowFilterCreate && visibleSection === "filter" ? (
        <div
          className={`update-user fixed left-0 top-0 flex h-[100vh] w-full items-center justify-center`}
        >
          <FilterCreate
            filterVals={filterVals}
            setFilterVals={setFilterVals}
            setIsShowFilterCreate={setIsShowFilterCreate}
          />
        </div>
      ) : null}
    </div>
  );
}
