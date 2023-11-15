import { useState } from "react";
import CreateQuestions from "./CreateQuestions";
import CreateSurveyForm from "./CreateSurveyForm";

export default function CreateSurvey() {
    const [surveyId, setSurveyId] = useState(null);
    const [surveyTitle, setSurveyTitle] = useState(null);
    const [isSurveyCreate, setIsSurveyCreate] = useState(false);

    return (
        <>
            {!isSurveyCreate ? (
                <CreateSurveyForm
                    setSurveyId={setSurveyId}
                    setSurveyTitle={setSurveyTitle}
                    setIsSurveyCreate={setIsSurveyCreate}
                />
            ) : (
                <CreateQuestions
                    surveyId={surveyId}
                    surveyTitle={surveyTitle}
                />
            )}
        </>
    );
}
