import { Link } from "react-router-dom";
import { useState } from "react";

import useFetch from "@/hooks/useFetch";

import makeRequest from "@/utils/makeRequest";
import swal from "@/utils/swal";

//components
import PageTitle from "@helperComps/PageTitle";
import Table from "@helperComps/table/Table";
import Thead from "@helperComps/table/Thead";
import Trow from "@helperComps/table/Trow";
import Tdata from "@helperComps/table/Tdata";
import TableDateTime from "@helperComps/table/TableDateTime";
import Pagination from "@helperComps/Pagination";
import PaginationSelect from "@helperComps/PaginationSelect";
import LoadingSpinner from "@helperComps/LoadingSpinner";

import NewsDelPop from "./utilComponents/NewsDelPop";

const HEADERS = ["Name", "Category", "Date", "Actions"];

export default function NewsTable() {
  const [queryParams, setQueryParams] = useState({
    page: 1,
    count: 10,
    query: "",
  });
  const params = new URLSearchParams(queryParams);
  const { loading, fetchedData, setFetchedData, error } = useFetch(
    `news/get-news?${params}`
  );

  const [totalItems, setTotalItems] = useState(1);
  const [delInfo, setDelInfo] = useState({
    id: null,
    idx: null,
  });
  const [delPop, setDelPop] = useState(false);

  const handleDelPop = (id, idx) => {
    setDelInfo({ id, idx });
    setDelPop(true);
  };

  const handleDelete = async () => {
    try {
      const response = await makeRequest(
        `news/delete-news?id=${delInfo.id}`,
        "DELETE"
      );

      if (!response.isSuccess) {
        throw new Error(response.message);
      }

      swal("success", response.message);

      //TODO: manage state
      setDelPop(false);
    } catch (error) {
      swal("error", error.message);
    }
  };

  return (
    <div className="flex flex-col gap-8">
      <div className="flex w-full items-center justify-between">
        <PageTitle name={"News"} />
        <Link to={"create"}>
          <button className="btn-primary">
            <i className="fa-solid fa-plus"></i>
            Add News
          </button>
        </Link>
      </div>
      <div className="flex justify-between">
        <input
          type="text"
          className="pill-primary w-3/4 border-0"
          placeholder={"Search in News..."}
          value={queryParams.searchQuery}
          onChange={(e) => {
            setQueryParams((prev) => ({
              ...prev,
              page: 1,
              query: e.target.value,
            }));
          }}
        />
        {/* <PaginationSelect
          setItemsPerPage={setItemsPerPage}
          setPage={setPage}
          itemsPerPage={itemsPerPage}
        /> */}
      </div>

      <div className="h-[55vh] overflow-y-scroll bg-white">
        {loading ? (
          <LoadingSpinner />
        ) : error?.message == 204 ? (
          <div className="flex h-full items-center justify-center opacity-50">
            No News Found !!
          </div>
        ) : (
          <Table>
            <Thead headers={HEADERS} />
            <tbody>
              {fetchedData?.data.map((news, index) => (
                <Trow key={news.id}>
                  <Tdata left>{news.title}</Tdata>
                  <Tdata capitalize>{news.category}</Tdata>
                  <Tdata mono>
                    <TableDateTime date={news.created_at} />
                  </Tdata>
                  <Tdata>
                    <div className="flex justify-center gap-5 text-xl">
                      <div className="flex justify-center">
                        <div className="tool-tip-div group">
                          <Link to={news.source_url} target="_blank">
                            <i className="fa-solid fa-link"></i>
                          </Link>
                          <span className="tool-tip-span -right-[1.8rem] -top-12 bg-black ">
                            Visit Link
                            <span className="tooltip-arrow bottom-[-2px] left-[41%]"></span>
                          </span>
                        </div>
                      </div>
                      <div className="flex justify-center">
                        <div className="tool-tip-div group">
                          <Link
                            to={`edit/${news.id}`}
                            state={{
                              from: news,
                            }}
                          >
                            <i className="fa-solid fa-pen-to-square"></i>
                          </Link>
                          <span className="tool-tip-span -right-[1.8rem] -top-12 bg-black ">
                            Edit News
                            <span className="tooltip-arrow bottom-[-2px] left-[46%]"></span>
                          </span>
                        </div>
                      </div>
                      <div className="flex justify-center">
                        <div className="tool-tip-div group">
                          <button onClick={() => handleDelPop(news.id, index)}>
                            <i className="fa-solid fa-trash"></i>
                          </button>
                          <span className="tool-tip-span -right-[2.8rem] -top-12 bg-black ">
                            Delete News
                            <span className="tooltip-arrow bottom-[-2px] left-[41%]"></span>
                          </span>
                        </div>
                      </div>
                    </div>
                  </Tdata>
                </Trow>
              ))}
            </tbody>
          </Table>
        )}
      </div>
      {/* <Pagination
        setItemsPerPage={setItemsPerPage}
        page={page}
        setPage={setPage}
        totalItems={totalItems}
        itemsPerPage={itemsPerPage}
      /> */}
      <NewsDelPop
        delPop={delPop}
        setDelPop={setDelPop}
        handleDelete={handleDelete}
      />
    </div>
  );
}
