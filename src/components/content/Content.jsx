import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

// component imports
import PageTitle from "../PageTitle";
import Table from "../table/Table";
import Thead from "../table/Thead";
import Trow from "../table/Trow";
import Tdata from "../table/Tdata";

const BASE_URL = import.meta.env.VITE_BASE_URL;
const HEADERS = ["Name", "Status", "Category", "Creation Date", "Actions"];

export default function Content() {
    const [articleList, setArticleList] = useState([]);

    const convertToLocal = (date) => {
        const dateObj = new Date(date);
        return dateObj.toLocaleString();
    };

    const handlePublish = async (articleId, index) => {
        const request = {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                authToken: localStorage.getItem("authToken"),
            },
            body: JSON.stringify({ articleId }),
        };

        try {
            const response = await fetch(
                `${BASE_URL}/article/toggle-article-status`,
                request
            );

            if (response.status >= 500) {
                throw new Error(response.status);
            }

            const json = await response.json();

            if (!json.isSuccess) {
                throw new Error(json.message);
            }

            const updatedList = [...articleList];
            updatedList[index].is_published = !updatedList[index].is_published;
            setArticleList(updatedList);
        } catch (error) {
            console.error(error);
        }
    };

    console.log(articleList);

    useEffect(() => {
        const controller = new AbortController();
        const signal = controller.signal;

        const request = {
            signal,
            headers: {
                authToken: localStorage.getItem("authToken"),
            },
        };

        async function getArticleList() {
            try {
                const response = await fetch(
                    `${BASE_URL}/site-admin/get-article-list`,
                    request
                );

                if (!response.ok) {
                    throw new Error(response.status);
                }

                const json = await response.json();

                if (!json.isSuccess) {
                    throw new Error(json.message);
                }

                setArticleList(json.data.toReversed());
            } catch (error) {
                console.error(error);
            }
        }

        getArticleList();

        return () => {
            controller.abort();
        };
    }, []);

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
                                    {is_published ? "Public" : "Private"}
                                </Tdata>
                                <Tdata capitalize>{category}</Tdata>
                                <Tdata>{convertToLocal(created_date)}</Tdata>
                                <Tdata>
                                    <div className="flex justify-center gap-4 text-xl">
                                        <Link
                                            to={`/content/edit/${article_id}`}
                                        >
                                            <button>
                                                <i className="fa-solid fa-pen-to-square"></i>
                                            </button>
                                        </Link>
                                        <button
                                            onClick={() =>
                                                handlePublish(article_id, index)
                                            }
                                        >
                                            <i className="fa-regular fa-newspaper"></i>
                                        </button>
                                    </div>
                                </Tdata>
                            </Trow>
                        )
                    )}
                </tbody>
            </Table>
        </div>
    );
}
