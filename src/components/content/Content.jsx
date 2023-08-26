import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import makeRequest from "../../utils/makeRequest";
import TableHead from "../TableHead";
import TableData from "../TableData";

export default function Content() {
    const headers = ["Name", "Status", "Category", "Creation Date", " "];
    const [articleList, setArticleList] = useState([]);

    const getArticleList = async () => {
        const response = await makeRequest('site-admin/get-article-list', 'GET');
        response.isSuccess ? setArticleList(response.data) : alert(response.message);
    } 

    const handlePublish = async (articleId) => {
        const response = await makeRequest('article/toggle-article-status', 'PATCH', {articleId: articleId});
        alert(response.message);
    }

    useEffect(() => {
        getArticleList();
    }, [articleList])

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
            <table className="table">
                {/* <TableHead headers={headers} /> */}

                <thead className="text-xl">
                    <tr>
                        {
                            headers.map((header, index) => (
                                <th key={index}
                                    className="px-4 py-8 first-of-type:text-left first-of-type:w-1/2">
                                    {header}
                                </th>
                            ))
                        }
                    </tr>
                </thead>

                <tbody className="text-lg">
                    {
                        articleList.slice(0).reverse().map((article) => (
                            <tr key={article.article_id}>
                                {/* <TableData data={article.article_title} left truncate /> */}
                                <td className="p-4 text-left truncate">
                                    {article.article_title}
                                </td>

                                {/* TODO: make this easier to read */}
                                <td className={`p-4 ${article.is_published ? 'text-green' : 'text-secondary'} font-bold`}>
                                    {article.is_published ? 'Public' : 'Private'}
                                </td>

                                <TableData data={article.category} capitalize={true} />
                                <TableData data={article.created_date.split("T")[0]} />

                                <td className="p-4 flex justify-evenly">
                                    <Link to={`/content/edit/${article.article_id}`}>
                                        <button>
                                            <i className="fa-solid fa-pen-to-square"></i>
                                        </button>
                                    </Link>
                                    <button onClick={() => handlePublish(article.article_id)}>
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

