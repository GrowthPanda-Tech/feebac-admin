import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import makeRequest from "../../utils/makeRequest";
import calculateAge from "../../utils/calculateAge";
import loyaltyImg from "../../assets/loyalty.png";

const TABLEHEADERS = ["Title", "Category", "Start Date", "End Date", "Status"];

export default function UserInfo() {
    const { slug } = useParams();

    const [userInfo, setUserInfo] = useState({});
    const [surveyList, setSurveyList] = useState([]);

    const getUserInfo = async () => {
        try {
            const response = await makeRequest(
                `site-admin/get-user-info?userId=${slug}`,
                "GET"
            );
            if (response.isSuccess) {
                setUserInfo(response.data.userInfo);
                setSurveyList(response.data.surveyList);
            }
        } catch (error) {
            // TODO: Handle error more intelligently
            console.error(error);
        }
    };

    useEffect(() => {
        getUserInfo();
    }, []);

    //TODO: Refactor
    return (
        <>
            <h1 className="heading text-secondary">{slug}</h1>

            <div className="flex flex-col gap-8">
                {/* Top section */}
                <div className="flex justify-between items-center">
                    <div className="flex flex-col gap-4">
                        <h1 className="heading mb-0"> Personal Information </h1>
                        <div className="text-lg font-medium leading-7">
                            Gender : {userInfo.gender}
                        </div>
                        <div className="text-lg font-medium leading-7">
                            Age :
                            {userInfo.date_of_birth
                                ? calculateAge(userInfo.date_of_birth)
                                : "-N/A-"}
                        </div>
                        <div className="text-lg font-medium leading-7">
                            State : {userInfo.state}
                        </div>
                    </div>

                    <div className="flex justify-center items-center w-80 h-60 bg-white rounded-lg shadow border border-grey">
                        <div className="flex flex-col justify-center items-center">
                            <img src={loyaltyImg} className="h-12 w-12" />
                            <span className="text-accent text-3xl font-semibold leading-loose">
                                {userInfo.loyalty_points}
                            </span>
                            <span className="text-black text-lg font-medium leading-7">
                                Earned Loyalty Points
                            </span>
                        </div>
                    </div>
                </div>

                {/* Participated Surveys Table */}
                <div>
                    <table className="table text-lg">
                        <thead>
                            <tr>
                                {TABLEHEADERS.map((header, index) => (
                                    <th
                                        className="first-of-type:text-left p-6"
                                        key={index}
                                    >
                                        {header}
                                    </th>
                                ))}
                            </tr>
                        </thead>

                        <tbody>
                            {surveyList.map((survey) => (
                                <tr>
                                    <td className="first-of-type:text-left p-6">
                                        {survey.survey_title}
                                    </td>
                                    <td className="capitalize">
                                        {survey.category}
                                    </td>
                                    <td className="font-mono">
                                        {survey.start_date}
                                    </td>
                                    <td className="font-mono">
                                        {survey.end_date}
                                    </td>
                                    <td>
                                        {survey.total_response > 0
                                            ? "Completed"
                                            : "Incomplete"}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}
