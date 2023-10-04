import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import makeRequest from "../../utils/makeRequest";

// component imports
import PageTitle from "../PageTitle";
import Table from "../table/Table";
import Thead from "../table/Thead";
import Trow from "../table/Trow";
import Tdata from "../table/Tdata";
import AlertComponent from "../AlertComponent/AlertComponent";

const HEADERS = ["Name", "Status", "Category", "Creation Date", "Actions"];

export default function Content() {
    const [articleList, setArticleList] = useState([]);

    const convertToLocal = (date) => {
        const dateObj = new Date(date);
        return dateObj.toLocaleString();
    };

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
                const response = await makeRequest(
                    "site-admin/get-article-list?page=1&count=1000"
                );

                if (!response.isSuccess) {
                    throw new Error(json.message);
                }

                if (!ignore) {
                    setArticleList(response.data.toReversed());
                }
            } catch (error) {
                console.error(error);
            }
        }

        getArticleList();

        return () => {
            ignore = true;
        };
    }, []);

    console.log(articleList.length);

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

            <div className="h-[69vh] relative overflow-y-scroll bg-white">
                <Table>
                    <Thead headers={HEADERS} />
                    <tbody className="">
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
                                    <Tdata>
                                        {convertToLocal(created_date)}
                                    </Tdata>
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
                                                    handlePublish(
                                                        article_id,
                                                        index
                                                    )
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
        </div>
    );
}
