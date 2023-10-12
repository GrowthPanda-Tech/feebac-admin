import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

import makeRequest from "../../utils/makeRequest";
import convertToLocale from "../../utils/convertToLocale";

// component imports
import PageTitle from "../PageTitle";
import Table from "../table/Table";
import Thead from "../table/Thead";
import Trow from "../table/Trow";
import Tdata from "../table/Tdata";
import AlertComponent from "../AlertComponent/AlertComponent";
import Pagination from "../Pagination";
import PaginationSelect from "../PaginationSelect";
import LoadingSpinner from "../_helperComponents/LoadingSpinner";

const HEADERS = ["Name", "Status", "Category", "Creation Date", "Actions"];

export default function Content() {
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [page, setPage] = useState(1);
    const [articleList, setArticleList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [totalItems, setTotalItems] = useState(1);
    // const [sortOrder, setSortOrder] = useState("");
    // const sortedData = [...articleList];

    // if (sortOrder === "asc") {
    //     sortedData.sort((a, b) =>
    //         a.article_title.localeCompare(b.article_title)
    //     );
    // } else if (sortOrder === "desc") {
    //     sortedData.sort((a, b) =>
    //         b.article_title.localeCompare(a.article_title)
    //     );
    // }

    const handlePublish = async (articleId, index) => {
        try {
            const response = await makeRequest(
                "article/toggle-article-status",
                "PATCH",
                { articleId }
            );

            if (!response.isSuccess) {
                AlertComponent("failed", response);
                throw new Error(response.message);
            }

            const updatedList = [...articleList];
            updatedList[index].is_published = !updatedList[index].is_published;
            setArticleList(updatedList);

            AlertComponent("success", response);
        } catch (error) {
            console.error(error);
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
                    throw new Error(json.message);
                }

                if (!ignore) {
                    setArticleList(response.data.toReversed());
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
            <div className="flex w-full justify-between items-center">
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
                    className="pill-primary border-0 w-3/4"
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

            <div className="h-[55vh] relative overflow-y-scroll bg-white">
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
                                                <span className=" chip-green">
                                                    Public
                                                </span>
                                            ) : (
                                                <span className="chip-red">
                                                    Private
                                                </span>
                                            )}
                                        </Tdata>
                                        <Tdata capitalize>{category}</Tdata>
                                        <Tdata>
                                            {convertToLocale(created_date)}
                                        </Tdata>
                                        <Tdata>
                                            <div className="flex justify-center gap-4 text-xl">
                                                <div className="flex justify-center">
                                                    <div className="tool-tip-div group">
                                                        <Link
                                                            to={`/content/edit/${article_id}`}
                                                        >
                                                            <button>
                                                                <i className="fa-solid fa-pen-to-square"></i>
                                                            </button>
                                                        </Link>
                                                        <span className="tool-tip-span -right-[2.8rem] bg-black -top-12 ">
                                                            Edit Article
                                                            <span className="tooltip-arrow bottom-[-2px] left-[37%]"></span>
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className="flex justify-center">
                                                    <div className="tool-tip-div group">
                                                        <button
                                                            onClick={() =>
                                                                handlePublish(
                                                                    article_id,
                                                                    index
                                                                )
                                                            }
                                                        >
                                                            <i className="fa-regular fa-newspaper"></i>
                                                        </button>
                                                        <span className="tool-tip-span  -right-[2.8rem] bg-black -top-12 ">
                                                            Toggle Status
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
                    <div className="flex justify-center items-center p-56 opacity-50">
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
