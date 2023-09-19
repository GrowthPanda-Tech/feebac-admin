import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import makeRequest from "../../utils/makeRequest";
import Table from "../table/Table";
import Thead from "../table/Thead";
import Trow from "../table/Trow";
import Tdata from "../table/Tdata";

export default function Content() {
    const headers = ["Name", "Status", "Category", "Creation Date", "Actions"];
    const [articleList, setArticleList] = useState([]);

    const getArticleList = async () => {
        const response = await makeRequest(
            "site-admin/get-article-list",
            "GET"
        );
        response.isSuccess
            ? setArticleList(response.data)
            : alert(response.message);
    };

    const handlePublish = async (articleId) => {
        const response = await makeRequest(
            "article/toggle-article-status",
            "PATCH",
            { articleId: articleId }
        );
        alert(response.message);
    };

    useEffect(() => {
        getArticleList();
    }, []);

    return (
        <div className="flex flex-col gap-8">
            <div className="flex w-full justify-between items-center">
                <h1 className="heading mb-0"> Articles List </h1>
                <Link to={"create"}>
                    <button className="btn-primary">
                        <i className="fa-solid fa-plus"></i>
                        Add New Article
                    </button>
                </Link>
            </div>

            <Table>
                <Thead headers={headers} />

                <tbody>
                    {articleList
                        .slice(0)
                        .reverse()
                        .map(
                            ({
                                article_id,
                                article_title,
                                is_published,
                                category,
                                created_date,
                            }) => (
                                <Trow key={article_id}>
                                    <Tdata left>{article_title}</Tdata>

                                    <Tdata>
                                        {is_published ? "Public" : "Private"}
                                    </Tdata>

                                    <Tdata capitalize>{category}</Tdata>

                                    <Tdata>{created_date.split("T")[0]}</Tdata>

                                    <Tdata>
                                        <div className="flex justify-evenly">
                                            <Link
                                                to={`/content/edit/${article_id}`}
                                            >
                                                <button>
                                                    <i className="fa-solid fa-pen-to-square"></i>
                                                </button>
                                            </Link>
                                            <button
                                                onClick={() =>
                                                    handlePublish(article_id)
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
