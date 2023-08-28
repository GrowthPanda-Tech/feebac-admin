import { useState } from "react";
import Form from "./Form";
import Question from "./Question";

export default function CreateSurvey() {
    const [surveyId, setSurveyId] = useState("");
    const [isSurveyCreate, setIsSurveyCreate] = useState(false);

    return (
        <>
            {!isSurveyCreate ? (
                <Form
                    setSurveyId={setSurveyId}
                    setIsSurveyCreate={setIsSurveyCreate}
                />
            ) : (
                <Question surveyId={surveyId} />
            )}
        </>
    );
}
