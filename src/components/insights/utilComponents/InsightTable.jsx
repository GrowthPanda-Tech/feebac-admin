import { useContext } from "react";
import { CategoryContext } from "../../../contexts/CategoryContext";
import { PageContext } from "../../../contexts/InsightPageContext";

import makeRequest from "../../../utils/makeRequest";
import swal from "../../../utils/swal";

import useFetch from "../../../hooks/useFetch";

import LoadingSpinner from "../../_helperComponents/LoadingSpinner";
import StatusChip from "../../_helperComponents/StatusChip";
import TableDateTime from "../../_helperComponents/table/TableDateTime";
import Table from "../../_helperComponents/table/Table";
import Thead from "../../_helperComponents/table/Thead";
import Trow from "../../_helperComponents/table/Trow";
import Tdata from "../../_helperComponents/table/Tdata";

const HEADERS = ["Title", "Status", "Date", "Category", "Actions"];

function Tbody({ insights, setInsights, setInsightId, setIsTable }) {
    const { categories } = useContext(CategoryContext);
    const { setPages } = useContext(PageContext);

    const getCatName = (id) => {
        let name = null;

        for (let i = 0; i < categories.length; i++) {
            const category = categories[i];
            if (category.category_id === id) {
                name = category.category_name;
                break;
            }
        }

        return name;
    };

    const handleStatus = async (id, index) => {
        try {
            const response = await makeRequest(
                "insights/toggle-insights-status",
                "PATCH",
                {
                    id,
                }
            );

            if (!response.isSuccess) {
                throw new Error(response.message);
            }

            const data = [...insights];
            data[index].isPublic = !data[index].isPublic;

            setInsights((prev) => ({ ...prev, data }));
        } catch (error) {
            swal("error", error.message);
        }
    };

    const handleEdit = async (id) => {
        try {
            const response = await makeRequest(
                `insights/get-full-insights?id=${id}`
            );

            if (!response.isSuccess) {
                throw new Error(response.message);
            }

            const pages = response.data.pages;

            sessionStorage.setItem("insightId", id);
            sessionStorage.setItem("insightPages", JSON.stringify(pages));

            setInsightId(id);
            setPages(pages);

            setIsTable(false);
        } catch (error) {
            swal("error", error.message);
        }
    };

    return (
        <tbody>
            {insights?.map((insight, index) => (
                <Trow key={insight.id}>
                    <Tdata left>{insight.title}</Tdata>
                    <Tdata>
                        <StatusChip status={insight.isPublic} />
                    </Tdata>
                    <Tdata mono>
                        <TableDateTime date={insight.dateTime} />
                    </Tdata>
                    <Tdata capitalize>{getCatName(insight.category)}</Tdata>
                    <Tdata>
                        <div className="flex gap-4 justify-center text-lg">
                            <i
                                className="fa-solid fa-pen-to-square cursor-pointer"
                                onClick={() => handleEdit(insight.id)}
                            />
                            <i
                                className={`fa-solid ${
                                    insight.isPublic ? "fa-eye-slash" : "fa-eye"
                                } cursor-pointer`}
                                onClick={() => handleStatus(insight.id, index)}
                            />
                        </div>
                    </Tdata>
                </Trow>
            ))}
        </tbody>
    );
}

export default function InsightTable({ setInsightId, setIsTable }) {
    const { loading, response, setResponse, error } = useFetch(
        "insights/get-insights-list"
    );

    if (loading) {
        return <LoadingSpinner />;
    }

    //TODO: error component? maybe? IDK..
    if (error) {
        console.error(error.message);
    }

    return (
        <Table>
            <Thead headers={HEADERS} />
            <Tbody
                insights={response?.data}
                setInsights={setResponse}
                setInsightId={setInsightId}
                setIsTable={setIsTable}
            />
        </Table>
    );
}
