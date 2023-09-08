import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import makeRequest from "../../utils/makeRequest";
import Table from "../table/Table";
import Thead from "../table/Thead";
import Tdata from "../table/Tdata";

export default function Content() {
    const headers = ["Name", "Status", "Category", "Creation Date", " "];
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
        <>
            {/* Top Row */}
            <div className="flex w-full justify-between items-center mb-8">
                <h1 className="heading mb-0"> Articles List </h1>
                <Link to={"create"}>
                    <button className="btn-primary">
                        <i className="fa-solid fa-plus"></i>
                        Add New Article
                    </button>
                </Link>
            </div>

            {/* Table */}
            <Table>
                <Thead headers={headers} />

                <tbody className="text-lg">
                    {articleList
                        .slice(0)
                        .reverse()
                        .map((article) => (
                            <tr
                                key={article.article_id}
                                className="border-b border-b-light-grey hover:bg-[#F8F8F8]"
                            >
                                <Tdata left truncate>
                                    {article.article_title}
                                </Tdata>

                                <Tdata>
                                    {article.is_published
                                        ? "Public"
                                        : "Private"}
                                </Tdata>

                                <Tdata capitalize>{article.category}</Tdata>
                                <Tdata>
                                    {article.created_date.split("T")[0]}
                                </Tdata>

                                <Tdata>
                                    <div className="flex justify-evenly">
                                        <Link
                                            to={`/content/edit/${article.article_id}`}
                                        >
                                            <button>
                                                <i className="fa-solid fa-pen-to-square"></i>
                                            </button>
                                        </Link>
                                        <button
                                            onClick={() =>
                                                handlePublish(
                                                    article.article_id
                                                )
                                            }
                                        >
                                            <i className="fa-regular fa-newspaper"></i>
                                        </button>
                                    </div>
                                </Tdata>
                            </tr>
                        ))}
                </tbody>
            </Table>
        </>
    );
}
