import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

import makeRequest from "../../utils/makeRequest";
import loyaltyImg from "../../assets/loyalty.png";

//components
import Table from "../table/Table";
import Thead from "../table/Thead";
import Trow from "../table/Trow";
import Tdata from "../table/Tdata";
import PageTitle from "../PageTitle";

const SURVEY_HEADERS = [
    "Title",
    "Category",
    "Start Date",
    "End Date",
    "Status",
];
const LOYALTY_HEADERS = ["Type", "Date", "Transaction"];

function PointStats({ name, value }) {
    return (
        <div className="flex flex-col items-center bg-secondary text-white text-lg w-1/2 py-6 font-medium rounded-xl">
            <span> {value} </span>
            <span> {name} </span>
        </div>
    );
}

export default function UserInfo() {
    const { slug } = useParams();

    const [surveyList, setSurveyList] = useState([]);
    const [transactInfo, setTransactInfo] = useState([]);
    const [points, setPoints] = useState({
        totalCredit: 0,
        totalSpend: 0,
    });

    useEffect(() => {
        let ignore = false;

        async function getUserInfo() {
            try {
                const response = await makeRequest(
                    `site-admin/get-user-info?userId=${slug}`
                );

                if (!response.isSuccess) {
                    throw new Error(response.message);
                }

                if (!ignore) {
                    setSurveyList(response.data.surveyList);
                }
            } catch (error) {
                console.error(error);
            }
        }

        async function getTransactInfo() {
            try {
                const response = await makeRequest(
                    `loyalty/get-loyalty-transaction?user=${slug}`
                );

                if (!response.isSuccess) {
                    throw new Error(response.message);
                }

                if (!ignore) {
                    setTransactInfo(response.data);
                    setPoints({
                        totalCredit: response.totalCredit,
                        totalSpend: response.totalSpend,
                    });
                }
            } catch (error) {
                console.error(error);
            }
        }

        getUserInfo();
        getTransactInfo();

        return () => {
            ignore = true;
        };
    }, []);

    return (
        <>
            <h1 className="text-2xl font-semibold mb-8 text-secondary border-b border-b-light-grey pb-8">
                {slug}
            </h1>

            <div className="flex flex-col gap-8">
                <div className="flex h-[40vh] justify-between gap-6">
                    {/* Transaction Info */}
                    <div className="flex flex-col gap-6 bg-white rounded-xl p-10 w-8/12">
                        <PageTitle name={"Transaction Ledger"} />
                        <div className=" overflow-y-scroll">
                            <Table>
                                <Thead headers={LOYALTY_HEADERS} />
                                <tbody>
                                    {transactInfo.map((transaction) => (
                                        <Trow key={transaction.id}>
                                            <Tdata left>
                                                {transaction.reason}
                                            </Tdata>
                                            <Tdata mono>
                                                {
                                                    transaction.dateTime.split(
                                                        " "
                                                    )[0]
                                                }
                                            </Tdata>
                                            <Tdata>
                                                {transaction.isCredit ? (
                                                    <div className="text-green">
                                                        + {transaction.value}
                                                    </div>
                                                ) : (
                                                    <div className="text-secondary">
                                                        - {transaction.value}
                                                    </div>
                                                )}
                                            </Tdata>
                                        </Trow>
                                    ))}
                                </tbody>
                            </Table>
                        </div>
                    </div>

                    <div className="flex flex-col gap-6 justify-evenly items-center bg-white rounded-xl p-8 w-4/12">
                        <div className="flex w-full gap-4">
                            <PointStats
                                name={"Total Gain"}
                                value={points.totalCredit}
                            />
                            <PointStats
                                name={"Total Spend"}
                                value={points.totalSpend}
                            />
                        </div>
                        <div className="flex flex-col justify-center items-center">
                            <img src={loyaltyImg} className="h-12 w-12" />
                            <span className="text-accent text-3xl font-semibold leading-loose">
                                {points.totalCredit - points.totalSpend}
                            </span>
                            <span className="text-black text-lg font-medium leading-7">
                                Remaining Points
                            </span>
                        </div>
                    </div>
                </div>

                {/* Participated Surveys Table */}
                <div className="bg-white rounded-xl">
                    <div className="p-7 text-xl font-semibold border-b border-b-light-grey flex gap-4">
                        <PageTitle name={"Participated Surveys"} />
                        <span className="bg-secondary rounded-full text-white w-8 h-8 flex items-center justify-center">
                            {surveyList.length}
                        </span>
                    </div>
                    <Table>
                        <Thead headers={SURVEY_HEADERS} />
                        <tbody>
                            {surveyList.map((survey) => (
                                <Trow key={survey.survey_id}>
                                    <Tdata left>{survey.survey_title}</Tdata>
                                    <Tdata capitalize>{survey.category}</Tdata>
                                    <Tdata mono>{survey.start_date}</Tdata>
                                    <Tdata mono>{survey.end_date}</Tdata>
                                    <Tdata>
                                        {survey.total_response > 0
                                            ? "Completed"
                                            : "Incomplete"}
                                    </Tdata>
                                </Trow>
                            ))}
                        </tbody>
                    </Table>
                    {surveyList.length === 0 ? (
                        <div className="flex justify-center p-6 opacity-50">
                            User hasn't participated in any surveys yet
                        </div>
                    ) : null}
                </div>
            </div>
        </>
    );
}
