import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import makeRequest from "../../utils/makeRequest";

//components
import PageTitle from "../PageTitle";
import Table from "../table/Table";
import Thead from "../table/Thead";
import Trow from "../table/Trow";
import Tdata from "../table/Tdata";

//assets
import link from "../../assets/link.svg";
import edit from "../../assets/edit.svg";

const HEADERS = ["Name", "Category", "Date", "Actions"];

export default function NewsTable() {
    const [newsList, setNewsList] = useState([]);

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
    });

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
                    {newsList.map((news) => (
                        <Trow key={news.id}>
                            <Tdata left>{news.title}</Tdata>
                            <Tdata capitalize>{news.category}</Tdata>
                            <Tdata mono>{news.createDate.split(" ")[0]}</Tdata>
                            <Tdata>
                                <div className="flex justify-center gap-5">
                                    <Link to={news.newsUrl} target="_blank">
                                        <img src={link} />
                                    </Link>
                                    <Link to={"edit"}>
                                        <img src={edit} />
                                    </Link>
                                </div>
                            </Tdata>
                        </Trow>
                    ))}
                </tbody>
            </Table>
        </div>
    );
}
