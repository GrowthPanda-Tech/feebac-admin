import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import makeRequest from "../../utils/makeRequest";

//components
import PageTitle from "../PageTitle";
import Table from "../table/Table";
import Thead from "../table/Thead";
import Trow from "../table/Trow";
import Tdata from "../table/Tdata";
import TableDateTime from "../table/TableDateTime";
import NewsDelPop from "./utilComponents/NewsDelPop";
import AlertComponent from "../AlertComponent/AlertComponent";
import Pagination from "../Pagination";
import PaginationSelect from "../PaginationSelect";
import LoadingSpinner from "../_helperComponents/LoadingSpinner";

const HEADERS = ["Name", "Category", "Date", "Actions"];

export default function NewsTable() {
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [page, setPage] = useState(1);
    const [newsList, setNewsList] = useState([]);
    const [totalItems, setTotalItems] = useState(1);
    const [searchQuery, setSearchQuery] = useState("");
    const [delInfo, setDelInfo] = useState({
        id: null,
        idx: null,
    });
    const [delPop, setDelPop] = useState(false);
    const [loading, setLoading] = useState(false);

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

            if (response.isSuccess) {
                AlertComponent("success", response);
                const updatedList = newsList.filter(
                    (_, index) => index != delInfo.idx
                );
                setNewsList(updatedList);
                setDelPop(false);
            } else {
                AlertComponent("failed", response);
                throw new Error(response.message);
            }
        } catch (error) {
            AlertComponent("error", "", error);
        }
    };

    useEffect(() => {
        let ignore = false;

        async function getNewsList() {
            try {
                setLoading(true);
                const response = await makeRequest(
                    `news/get-news?page=${page}&count=${itemsPerPage}&query=${searchQuery}`
                );

                if (!response.isSuccess) {
                    throw new Error(response.message);
                }

                if (!ignore) {
                    setLoading(false);
                    setNewsList(response.data);
                    setTotalItems(response.totalCount);
                }
            } catch (error) {
                console.error(error);

                if (error.message == 204) {
                    setLoading(false);
                    setNewsList([]);
                    setTotalItems(1);
                }
            }
        }

        getNewsList();

        return () => {
            ignore = true;
        };
    }, [page, itemsPerPage, searchQuery]);

    return (
        <div className="flex flex-col gap-8">
            <div className="flex w-full justify-between items-center">
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
                    className="pill-primary border-0 w-3/4"
                    placeholder={`Search in News...`}
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

            <div className="h-[55vh] bg-white overflow-y-scroll">
                {loading ? (
                    <LoadingSpinner />
                ) : (
                    <Table>
                        <Thead headers={HEADERS} />
                        <tbody>
                            {newsList.map((news, index) => (
                                <Trow key={news.id}>
                                    <Tdata left>{news.title}</Tdata>
                                    <Tdata capitalize>{news.category}</Tdata>
                                    <Tdata mono>
                                        <TableDateTime data={news.createDate} />
                                    </Tdata>
                                    <Tdata>
                                        <div className="text-xl flex justify-center gap-5">
                                            <div className="flex justify-center">
                                                <div className="tool-tip-div group">
                                                    <Link
                                                        to={news.newsUrl}
                                                        target="_blank"
                                                    >
                                                        <i className="fa-solid fa-link"></i>
                                                    </Link>
                                                    <span className="tool-tip-span -right-[1.8rem] bg-black -top-12 ">
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
                                                    <span className="tool-tip-span -right-[1.8rem] bg-black -top-12 ">
                                                        Edit News
                                                        <span className="tooltip-arrow bottom-[-2px] left-[46%]"></span>
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="flex justify-center">
                                                <div className="tool-tip-div group">
                                                    <button
                                                        onClick={() =>
                                                            handleDelPop(
                                                                news.id,
                                                                index
                                                            )
                                                        }
                                                    >
                                                        <i className="fa-solid fa-trash"></i>
                                                    </button>
                                                    <span className="tool-tip-span -right-[2.8rem] bg-black -top-12 ">
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
                {newsList.length === 0 ? (
                    <div className="flex justify-center items-center p-56 opacity-50">
                        No News Found !!
                    </div>
                ) : null}
            </div>
            <Pagination
                setItemsPerPage={setItemsPerPage}
                page={page}
                setPage={setPage}
                totalItems={totalItems}
                itemsPerPage={itemsPerPage}
            />
            <NewsDelPop
                delPop={delPop}
                setDelPop={setDelPop}
                handleDelete={handleDelete}
            />
        </div>
    );
}
