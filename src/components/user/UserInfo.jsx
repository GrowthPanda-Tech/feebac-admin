import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

import makeRequest from "../../utils/makeRequest";
import loyaltyImg from "../../assets/loyalty.png";

//components
import Table from "../__helperComponents__/table/Table";
import Thead from "../__helperComponents__/table/Thead";
import Trow from "../__helperComponents__/table/Trow";
import Tdata from "../__helperComponents__/table/Tdata";
import TableDateTime from "../__helperComponents__/table/TableDateTime";

import PageTitle from "../__helperComponents__/PageTitle";
import LoadingSpinner from "../__helperComponents__/LoadingSpinner";

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
    <div className="flex w-1/2 flex-col items-center rounded-xl bg-secondary py-6 text-lg font-medium text-white">
      <span> {value} </span>
      <span> {name} </span>
    </div>
  );
}

export default function UserInfo() {
  const { slug } = useParams();

  const [surveyList, setSurveyList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [transactInfo, setTransactInfo] = useState([]);
  const [points, setPoints] = useState({
    totalCredit: 0,
    totalSpend: 0,
  });

  useEffect(() => {
    let ignore = false;

    async function getUserInfo() {
      try {
        setLoading(true);

        const response = await makeRequest(
          `site-admin/get-user-info?userId=${slug}`,
        );

        if (!response.isSuccess) {
          throw new Error(response.message);
        }

        if (!ignore) {
          setSurveyList(response.data.surveyList);
          setLoading(false);
        }
      } catch (error) {
        if (error.message == 204) {
          setLoading(false);
          setSurveyList([]);
        }
      }
    }

    async function getTransactInfo() {
      try {
        // setLoading(false);

        const response = await makeRequest(
          `loyalty/get-loyalty-transaction?user=${slug}`,
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
          // setLoading(false);
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
      <h1 className="border-b border-b-light-grey p-2 text-2xl font-semibold text-secondary">
        {slug}
      </h1>

      <div className="mt-2 flex flex-col gap-8">
        <div className="flex h-[33vh] justify-between gap-6">
          <div className="flex w-8/12 flex-col gap-6 rounded-xl bg-white p-6">
            <PageTitle name={"Transaction Ledger"} />
            <div className=" overflow-y-scroll">
              {loading ? (
                <LoadingSpinner />
              ) : (
                <Table>
                  <Thead headers={LOYALTY_HEADERS} />
                  <tbody>
                    {transactInfo.map((transaction) => (
                      <Trow key={transaction.id}>
                        <Tdata left>{transaction.reason.type}</Tdata>
                        <Tdata mono>
                          <TableDateTime date={transaction.dateTime} />
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
              )}
            </div>
          </div>

          <div className="flex w-4/12 flex-col items-center justify-evenly gap-6 rounded-xl bg-white p-8">
            <div className="flex w-full gap-4">
              <PointStats name={"Total Gain"} value={points.totalCredit} />
              <PointStats name={"Total Spend"} value={points.totalSpend} />
            </div>
            <div className="flex flex-col items-center justify-center">
              <img src={loyaltyImg} className="h-12 w-12" />
              <span className="text-3xl font-semibold leading-loose text-accent">
                {points.totalCredit - points.totalSpend}
              </span>
              <span className="text-lg font-medium leading-7 text-black">
                Remaining Points
              </span>
            </div>
          </div>
        </div>

        {/* Participated Surveys Table */}
        <div className="rounded-xl bg-white ">
          <div className="flex gap-4 border-b border-b-light-grey p-6 text-xl font-semibold">
            <PageTitle name={"Participated Surveys"} />
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-secondary text-white">
              {surveyList.length}
            </span>
          </div>
          <div className=" h-[28vh] overflow-y-scroll">
            {loading ? (
              <LoadingSpinner />
            ) : (
              <Table>
                <Thead headers={SURVEY_HEADERS} />
                <tbody>
                  {surveyList.map((survey) => (
                    <Trow key={survey.survey_id}>
                      <Tdata left>{survey.survey_title}</Tdata>
                      <Tdata capitalize>{survey.category.category_name}</Tdata>
                      <Tdata mono>
                        <TableDateTime date={survey.start_date} />
                      </Tdata>

                      <Tdata mono>
                        <TableDateTime date={survey.end_date} />
                      </Tdata>
                      <Tdata>
                        {survey.total_response > 0 ? (
                          <span className="chip-green">Completed</span>
                        ) : (
                          <span className="chip-red">Incomplete</span>
                        )}
                      </Tdata>
                    </Trow>
                  ))}
                </tbody>
              </Table>
            )}
          </div>
          {!loading && surveyList.length === 0 ? (
            <div className="flex justify-center p-2 opacity-50">
              User hasn&apos;t participated in any surveys yet
            </div>
          ) : null}
        </div>
      </div>
    </>
  );
}
