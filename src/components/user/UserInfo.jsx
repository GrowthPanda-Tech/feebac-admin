import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import makeRequest from "../../utils/makeRequest";
import calculateAge from "../../utils/calculateAge";
import loyaltyImg from "../../assets/loyalty.png";
import Table from "../table/Table";
import Thead from "../table/Thead";
import Trow from "../table/Trow";
import Tdata from "../table/Tdata";
import PageTitle from "../PageTitle";

const HEADERS = ["Title", "Category", "Start Date", "End Date", "Status"];

function Input({ value }) {
    return (
        <input
            value={value}
            className="input-primary w-4/5 mt-0 disabled:opacity-70"
            disabled
        />
    );
}

function Label({ name, children }) {
    return (
        <label className="flex gap-4 items-center">
            <span className="font-medium text-lg w-1/5"> {name}: </span>
            {children}
        </label>
    );
}

export default function UserInfo() {
    const { slug } = useParams();

    const [userInfo, setUserInfo] = useState({});
    const [surveyList, setSurveyList] = useState([]);

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
                    setUserInfo(response.data.userInfo);
                    setSurveyList(response.data.surveyList);
                }
            } catch (error) {
                console.error(error);
            }
        }

        getUserInfo();

        return () => (ignore = true);
    }, []);

    return (
        <>
            <h1 className="text-2xl font-semibold mb-8 text-secondary border-b border-b-light-grey pb-8">
                {slug}
            </h1>

            <div className="flex flex-col gap-8">
                <div className="flex justify-between">
                    {/* Info card */}
                    <div className="flex flex-col gap-6 bg-white rounded-xl p-10 w-8/12">
                        <PageTitle name={"Personal Information"} />
                        <Label name={"Gender"}>
                            <Input value={userInfo.gender} />
                        </Label>
                        <Label name={"Age"}>
                            <Input
                                value={
                                    userInfo.date_of_birth
                                        ? calculateAge(userInfo.date_of_birth)
                                        : "-"
                                }
                            />
                        </Label>
                        <Label name={"State"}>
                            <Input
                                value={userInfo.state ? userInfo.state : "-"}
                            />
                        </Label>
                    </div>

                    {/* Loyalty point card */}
                    <div className="flex flex-col justify-center items-center bg-white rounded-xl h-fit py-14 w-3/12">
                        <img src={loyaltyImg} className="h-12 w-12" />
                        <span className="text-accent text-3xl font-semibold leading-loose">
                            {userInfo.loyalty_points
                                ? userInfo.loyalty_points
                                : "0"}
                        </span>
                        <span className="text-black text-lg font-medium leading-7">
                            Earned Loyalty Points
                        </span>
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
                        <Thead headers={HEADERS} />
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
                </div>
            </div>
        </>
    );
}
