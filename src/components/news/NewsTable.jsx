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
  //Query params
  const [queryParams, setQueryParams] = useState({
    page: 1,
    count: 10,
    query: "",
  });
  const params = new URLSearchParams(queryParams);
  const { loading, fetchedData, setFetchedData, error } = useFetch(
    `news/get-news-admin?${params}`,
  );
  const [isDelete, setIsDelete] = useState(false);

  //Rest of the states
  const [delInfo, setDelInfo] = useState({});
  const [delPop, setDelPop] = useState(false);

  const handleDelPop = (id, idx) => {
    setDelInfo({ id, idx });
    setDelPop(true);
  };

  const handleDelete = async () => {
    setIsDelete(true);

    try {
      const response = await makeRequest(
        `news/delete-news?id=${delInfo.id}`,
        "DELETE",
      );

      if (!response.isSuccess) throw new Error(response.message);
      swal("success", response.message);

      //update context
      const spread = { ...fetchedData };
      spread.data.splice(delInfo.idx, 1);
      setFetchedData(spread);

      setDelPop(false);
    } catch (error) {
      swal("error", error.message);
    } finally {
      setIsDelete(false);
    }
  };

  return (
    <div className="flex flex-col gap-8">
      <div className="flex w-full items-center justify-between">
        <PageTitle name={"Quick Reads"} />
        <Link to={"create"}>
          <button className="btn-primary">
            <i className="fa-solid fa-plus" />
            Create
          </button>
        </Link>
      </div>
      <div className="flex justify-between">
        <input
          type="text"
          className="pill-primary w-3/4 border-0"
          placeholder={"Search"}
          value={queryParams.searchQuery}
          onChange={(e) => {
            setQueryParams((prev) => ({
              ...prev,
              page: 1,
              query: e.target.value,
            }));
          }}
        />
        <PaginationSelect setQueryParams={setQueryParams} />
      </div>

      <div className="h-[55vh] overflow-y-scroll bg-white">
        {loading ? (
          <LoadingSpinner />
        ) : error?.message == 204 ? (
          <div className="flex h-full items-center justify-center opacity-50">
            No Quick Reads found !!
          </div>
        ) : (
          <Table>
            <Thead headers={HEADERS} />
            <tbody>
              {fetchedData?.data.map((news, index) => (
                <Trow key={news.id}>
                  <Tdata left>{news.title}</Tdata>
                  <Tdata capitalize>{news.category.category_name}</Tdata>
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
                          <span className="tool-tip-span -right-[0.5rem] -top-12 bg-black ">
                            Edit
                          </span>
                        </div>
                      </div>
                      <div className="flex justify-center">
                        <div className="tool-tip-div group">
                          <button onClick={() => handleDelPop(news.id, index)}>
                            <i className="fa-solid fa-trash"></i>
                          </button>
                          <span className="tool-tip-span -right-[1.2rem] -top-12 bg-black ">
                            Delete
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
      <Pagination
        page={queryParams.page}
        itemsPerPage={queryParams.count}
        setter={setQueryParams}
        totalItems={fetchedData?.totalCount}
      />
      <NewsDelPop
        delPop={delPop}
        setDelPop={setDelPop}
        handleDelete={handleDelete}
        isDelete={isDelete}
      />
    </div>
  );
}
