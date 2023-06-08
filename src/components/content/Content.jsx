import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import makeRequest from "../../utils/makeRequest";

export default function Content() {
    const [articleList, setArticleList] = useState([]);

    async function getArticleList() {
        const response = await makeRequest('site-admin/get-article-list', 'GET');
        if (!response.isSuccess) {
            alert(response.message);
            return;
        }
        setArticleList(response.data);
    } 
    useEffect(() => {
        getArticleList();
    }, [])

    async function handlePublish(articleId) {
        const response = await makeRequest('article/toggle-article-status', 'PATCH', {articleId: articleId});
        alert(response.message);
    }

    return (
        <div className="m-16">
            {/* Top Row */}
            <div className="flex w-full justify-between items-center">
                <span className="text-2xl font-semibold"> Articles List </span>
                <Link to={"create-new-article"}>
                    <button className="btn-primary">
                        <i className="fa-solid fa-plus"></i>
                        Add New Article
                    </button>
                </Link>
            </div>

            {/* TODO: Can I make this dynamic somehow? */}
            {/* Table */}
            <table className="table-auto w-full bg-white rounded-xl mt-8 text-center">
                <thead className="text-xl">
                    <tr>
                        <th className="p-6"> No. </th>
                        <th className="p-6"> Name </th>
                        <th className="p-6"> Status </th>
                        <th className="p-6"> Category </th>
                        <th className="p-6"> Create Date </th>
                        <th className="p-6"> </th>
                    </tr>
                </thead>
                <tbody className="text-lg">
                    {
                        articleList.map((article, index) => (
                            <tr key={article.article_id}>
                                <td className="p-6">
                                    {index + 1}
                                </td>
                                <td className="p-6">
                                    {article.article_title}
                                </td>
                                {/* TODO: make this easier to read */}
                                <td className={`p-6 ${article.is_published ? 'text-green' : 'text-secondary'} font-bold`}>
                                    {article.is_published ? 'Published' : 'Not published'}
                                </td>
                                <td className="p-6 capitalize">
                                    {article.category}
                                </td>
                                <td className="p-6">
                                    {article.created_date.split("T")[0]}
                                </td>
                                <td className="p-6 flex justify-evenly">
                                    <Link to={`/content/edit/${article.article_id}`}>
                                        <button className="btn-actions py-3">
                                            {/* TODO: Convert font-awesome to react component */}
                                            <i className="fa-regular fa-pen-to-square"></i>
                                        </button>
                                    </Link>
                                    <button onClick={() => handlePublish(article.article_id)} className="btn-actions py-3">
                                        <i className="fa-regular fa-newspaper"></i>
                                    </button>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    );
}

