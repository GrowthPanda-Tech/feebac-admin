import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import makeRequest from "../../utils/makeRequest";

//components
import PageTitle from "../PageTitle";
import Table from "../table/Table";
import Thead from "../table/Thead";
import Trow from "../table/Trow";
import Tdata from "../table/Tdata";
import NewsDelPop from "./NewsDelPop";
import AlertComponent from "../AlertComponent/AlertComponent";

//assets
import link from "../../assets/link.svg";
import edit from "../../assets/edit.svg";
import delIcon from "../../assets/delete.svg";

const HEADERS = ["Name", "Category", "Date", "Actions"];

export default function NewsTable() {
    const [newsList, setNewsList] = useState([]);
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
                //make count dynamic
                const response = await makeRequest(
                    "news/get-news?page=1&count=100"
                );

                if (!response.isSuccess) {
                    throw new Error(response.message);
                }

                if (!ignore) {
                    setNewsList(response.data);
                }
            } catch (error) {
                console.error(error);
            }
        }

        getNewsList();

        return () => {
            ignore = true;
        };
    }, []);

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

            <div className="h-[68vh] bg-white overflow-y-scroll">
                <Table>
                    <Thead headers={HEADERS} />
                    <tbody>
                        {newsList.map((news, index) => (
                            <Trow key={news.id}>
                                <Tdata left>{news.title}</Tdata>
                                <Tdata capitalize>{news.category}</Tdata>
                                <Tdata mono>
                                    {news.createDate.split(" ")[0]}
                                </Tdata>
                                <Tdata>
                                    <div className="text-xl flex justify-center gap-5">
                                        <div className="flex justify-center">
                                            <div class="tool-tip-div group">
                                                <Link
                                                    to={news.newsUrl}
                                                    target="_blank"
                                                >
                                                    <i className="fa-solid fa-link"></i>
                                                </Link>
                                                <span class="tool-tip-span -right-[2.8rem] bg-black -top-12 ">
                                                    Visit Link
                                                </span>
                                            </div>
                                        </div>
                                        <div className="flex justify-center">
                                            <div class="tool-tip-div group">
                                                <Link
                                                    to={`edit/${news.id}`}
                                                    state={{
                                                        from: news,
                                                    }}
                                                >
                                                    <i className="fa-solid fa-pen-to-square"></i>
                                                </Link>
                                                <span class="tool-tip-span -right-[2.8rem] bg-black -top-12 ">
                                                    Edit News
                                                </span>
                                            </div>
                                        </div>
                                        <div className="flex justify-center">
                                            <div class="tool-tip-div group">
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
                                                <span class="tool-tip-span -right-[2.8rem] bg-black -top-12 ">
                                                    Delete News
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </Tdata>
                            </Trow>
                        ))}
                    </tbody>
                </Table>
            </div>
            <NewsDelPop
                delPop={delPop}
                setDelPop={setDelPop}
                handleDelete={handleDelete}
            />
        </div>
    );
}
