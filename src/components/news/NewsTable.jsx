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

            if (!response.isSuccess) {
                throw new Error(response.message);
            }

            const updatedList = newsList.filter(
                (_, index) => index != delInfo.idx
            );
            setNewsList(updatedList);

            setDelPop(false);
        } catch (error) {
            console.error(error);
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

            <Table>
                <Thead headers={HEADERS} />
                <tbody>
                    {newsList.map((news, index) => (
                        <Trow key={news.id}>
                            <Tdata left>{news.title}</Tdata>
                            <Tdata capitalize>{news.category}</Tdata>
                            <Tdata mono>{news.createDate.split(" ")[0]}</Tdata>
                            <Tdata>
                                <div className="flex justify-center gap-5">
                                    <Link to={news.newsUrl} target="_blank">
                                        <img src={link} />
                                    </Link>
                                    <Link
                                        to={`edit/${news.id}`}
                                        state={{
                                            from: news,
                                        }}
                                    >
                                        <img src={edit} />
                                    </Link>
                                    <button
                                        onClick={() =>
                                            handleDelPop(news.id, index)
                                        }
                                    >
                                        <img
                                            className="text-secondary"
                                            src={delIcon}
                                        />
                                    </button>
                                </div>
                            </Tdata>
                        </Trow>
                    ))}
                </tbody>
            </Table>
            <NewsDelPop
                delPop={delPop}
                setDelPop={setDelPop}
                handleDelete={handleDelete}
            />
        </div>
    );
}
