import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import makeRequest from "../../utils/makeRequest";
import TableHead from "../TableHead";
import TableData from "../TableData";

export default function Content() {
    const [articleList, setArticleList] = useState([]);
    const headers = ["No.", "Name", "Status", "Category", "Creation Date", " "];

    async function getArticleList() {
        const response = await makeRequest('site-admin/get-article-list', 'GET');
        if (!response.isSuccess) {
            alert(response.message);
            return;
        }
        setArticleList(response.data);
    } 

    async function handlePublish(articleId) {
        const response = await makeRequest('article/toggle-article-status', 'PATCH', {articleId: articleId});
        alert(response.message);
    }

    useEffect(() => {
        getArticleList();
    }, [])

    return (
        <>
            {/* Top Row */}
            <div className="flex w-full justify-between items-center">
                <h1 className="heading"> Articles List </h1>
                <Link to={"create"}>
                    <button className="btn-primary">
                        <i className="fa-solid fa-plus"></i>
                        Add New Article
                    </button>
                </Link>
            </div>

            {/* Table */}
            <table className='table-fixed w-full bg-white rounded-xl mt-8 text-center'>
                <TableHead headers={headers} />

                <tbody className="text-lg">
                    {
                        articleList.map((article, index) => (
                            <tr key={article.article_id}>
                                <TableData data={index + 1} />
                                <TableData data={article.article_title} />

                                {/* TODO: make this easier to read */}
                                <td className={`p-6 ${article.is_published ? 'text-green' : 'text-secondary'} font-bold`}>
                                    {article.is_published ? 'Published' : 'Not published'}
                                </td>

                                <TableData data={article.category} capitalize={true} />
                                <TableData data={article.created_date.split("T")[0]} />

                                <td className="p-6 flex justify-evenly">
                                    <Link to={`/content/edit/${article.article_id}`}>
                                        <button className="btn-secondary">
                                            <i className="fa-regular fa-pen-to-square"></i>
                                        </button>
                                    </Link>
                                    <button onClick={() => handlePublish(article.article_id)} className="btn-secondary">
                                        <i className="fa-regular fa-newspaper"></i>
                                    </button>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </>
    );
}

