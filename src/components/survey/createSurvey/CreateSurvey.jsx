import { useState } from "react"
import { Link } from "react-router-dom";
import makeRequest from "../../../utils/makeRequest"
import Form from "./Form";
import Question from "./Question";

export default function CreateSurvey() {
    const [surveyId, setSurveyId] = useState('');
    const [optionsValue, setOptionsValue] = useState(new Array(2));

    const defaultQuestion = {
        questionTitle: "",
        type: { "2": "radio" },
        value: optionsValue,
    };

    const [questionList, setQuestionList] = useState([defaultQuestion]);
    const [questionType, setQuestionType] = useState(defaultQuestion.type);
    const [surveyQuestionData, setSurveyQuestionData] = useState({
        "surveyId": "",
        "questionTitle": "",
        "questionType": "2",
        "questionValue": {},
    });

    function handleQuesDataChange(e) {
        setSurveyQuestionData({ ...surveyQuestionData, [e.target.name]: e.target.value });
    }

    function handleOptionChange(e, index) {
        setSurveyQuestionData({
            ...surveyQuestionData,
            questionValue: {
                ...surveyQuestionData.questionValue,
                [index + 1]: e.target.value,
            },
        });
    }

    function handleQtype(type) {
        setQuestionType(type);
        setSurveyQuestionData({
            ...surveyQuestionData,
            questionType: Object.keys(questionType)[0]
        })
    }

    function modifyQuestion() {
        setQuestionList([...questionList, defaultQuestion])
    }

    async function handlePublish() {
        const startSurvey = await makeRequest('survey/start-survey', 'PATCH', {surveyId: surveyId, isStartNow: true})
        console.log(`Publish request sent`+ startSurvey);
    }

    console.log(surveyId);

    return (
        <div className="flex flex-col p-12 gap-12">
            {/* Top form section */}
            <h1 className="text-xl font-semibold">Create New Survey</h1>
            <Form setSurveyId={setSurveyId} />

            <h1 className="text-xl font-semibold">Survey Questions</h1>
            <Question surveyId={surveyId} qtypeClick={handleQtype} />
            {/* <div className="w-2/4 mx-auto flex justify-evenly"> */}
            {/*     <button className="rounded-xl font-bold text-xl px-20 py-3 bg-[#EA8552]" onClick={modifyQuestion}>Add Question</button> */}
            {/*     <button className="rounded-xl font-bold text-xl px-20 py-3 bg-[#CBCBCB]"> Cancel </button> */}
            {/* </div> */}
            {/* <div className="w-3/6 mx-auto flex justify-evenly gap-6 mt-12"> */}
            {/*     <button className="rounded-xl font-bold text-xl px-20 py-3 bg-[#EA525F] text-white"> Save </button> */}
            {/*     <button className="rounded-xl font-bold text-xl px-20 py-3 bg-[#A43948] text-white" onClick={handlePublish}> Publish </button> */}
            {/*     <Link to={"/survey"}> */}
            {/*         <button className="rounded-xl font-bold text-xl px-20 py-3 bg-[#CBCBCB]"> Cancel </button> */}
            {/*     </Link> */}
            {/* </div > */}
        </div>
    )
}
