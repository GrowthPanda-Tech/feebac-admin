import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

import makeRequest from "../../utils/makeRequest";
import swal from "../../utils/swal";

// component imports
import PageTitle from "../__helperComponents__/PageTitle";
import Table from "../__helperComponents__/table/Table";
import Thead from "../__helperComponents__/table/Thead";
import Trow from "../__helperComponents__/table/Trow";
import Tdata from "../__helperComponents__/table/Tdata";
import TableDateTime from "../__helperComponents__/table/TableDateTime";
import Pagination from "../__helperComponents__/Pagination";
import PaginationSelect from "../__helperComponents__/PaginationSelect";
import LoadingSpinner from "../__helperComponents__/LoadingSpinner";

const HEADERS = ["Name", "Status", "Category", "Creation Date", "Actions"];

export default function Content() {
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [page, setPage] = useState(1);
  const [articleList, setArticleList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [totalItems, setTotalItems] = useState(1);
  const [isPublishing, setIsPublishing] = useState(false);

  const handlePublish = async (articleId, index) => {
    try {
      setIsPublishing(true);
      const response = await makeRequest(
        "article/toggle-article-status",
        "PATCH",
        { articleId }
      );

      if (!response.isSuccess) {
        throw new Error(response.message);
      }

      const updatedList = [...articleList];
      updatedList[index].is_published = !updatedList[index].is_published;
      setArticleList(updatedList);

      swal("success", response.message);
    } catch (error) {
      swal("error", error.message);
    } finally {
      setIsPublishing(false);
    }
  };

  useEffect(() => {
    let ignore = false;

    async function getArticleList() {
      try {
        setLoading(true);
        const response = await makeRequest(
          `site-admin/get-article-list?page=${page}&count=${itemsPerPage}&query=${searchQuery}`
        );

        if (!response.isSuccess) {
          throw new Error(response.message);
        }

        if (!ignore) {
          setArticleList(response.data);
          setTotalItems(response.totalCount);
          setLoading(false);
        }
      } catch (error) {
        console.error(error);

        if (error.message == 204) {
          setLoading(false);
          setArticleList([]);
          setTotalItems(1);
        }
      }
    }

    getArticleList();

    return () => {
      ignore = true;
    };
  }, [page, itemsPerPage, searchQuery]);

  return (
    <div className="flex flex-col gap-8">
      <div className="flex w-full items-center justify-between">
        <PageTitle name={"Articles"} />
        <Link to={"create"}>
          <button className="btn-primary">
            <i className="fa-solid fa-plus"></i>
            Add New Article
          </button>
        </Link>
      </div>
      <div className=" flex justify-between gap-2">
        <input
          type="text"
          className="pill-primary w-3/4 border-0"
          placeholder={`Search in article...`}
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            setPage(1);
          }}
        />
        <PaginationSelect
          setItemsPerPage={setItemsPerPage}
          setPage={setPage}
          itemsPerPage={itemsPerPage}
        />
      </div>

      <div className="relative h-[55vh] overflow-y-scroll bg-white">
        {loading ? (
          <LoadingSpinner />
        ) : (
          <Table>
            <Thead headers={HEADERS} />
            <tbody>
              {articleList.map(
                (
                  {
                    article_id,
                    article_title,
                    is_published,
                    category,
                    created_date,
                  },
                  index
                ) => (
                  <Trow key={article_id}>
                    <Tdata left>{article_title}</Tdata>
                    <Tdata>
                      {is_published ? (
                        <span className=" chip-green">Public</span>
                      ) : (
                        <span className="chip-red">Private</span>
                      )}
                    </Tdata>
                    <Tdata capitalize>{category}</Tdata>
                    <Tdata mono>
                      <TableDateTime date={created_date} />
                    </Tdata>
                    <Tdata>
                      <div className="flex justify-center gap-4 text-xl">
                        <div className="flex justify-center">
                          <div className="tool-tip-div group">
                            <Link to={`/content/edit/${article_id}`}>
                              <button>
                                <i className="fa-solid fa-pen-to-square"></i>
                              </button>
                            </Link>
                            <span className="tool-tip-span -right-[2.8rem] -top-12 bg-black ">
                              Edit Article
                              <span className="tooltip-arrow bottom-[-2px] left-[37%]"></span>
                            </span>
                          </div>
                        </div>
                        <div className="flex justify-center">
                          <div className="tool-tip-div group">
                            <button
                              onClick={() => handlePublish(article_id, index)}
                              disabled={isPublishing}
                            >
                              <i
                                className={`fa-solid  ${
                                  is_published ? "fa-eye-slash" : "fa-eye"
                                } `}
                              ></i>
                            </button>
                            <span className="tool-tip-span  -right-[2.8rem] -top-12 bg-black ">
                              {is_published ? "Make Private" : "Make Public"}
                              <span className="tooltip-arrow bottom-[-2px] left-[50%]"></span>
                            </span>
                          </div>
                        </div>
                      </div>
                    </Tdata>
                  </Trow>
                )
              )}
            </tbody>
          </Table>
        )}
        {articleList.length === 0 ? (
          <div className="flex items-center justify-center p-56 opacity-50">
            Ops No Article Found !!
          </div>
        ) : null}
      </div>
      <Pagination
        setPage={setPage}
        page={page}
        setItemsPerPage={setItemsPerPage}
        itemsPerPage={itemsPerPage}
        totalItems={totalItems}
      />
    </div>
  );
}
