import { useState } from "react";
import CreateForm from "./CreateForm";
import Question from "./Question";

export default function CreateSurvey() {
    const [surveyId, setSurveyId] = useState(null);
    const [surveyTitle, setSurveyTitle] = useState(null);
    const [isSurveyCreate, setIsSurveyCreate] = useState(false);

    return (
        <>
            {!isSurveyCreate ? (
                <CreateForm
                    setSurveyId={setSurveyId}
                    setSurveyTitle={setSurveyTitle}
                    setIsSurveyCreate={setIsSurveyCreate}
                />
            ) : (
                <Question surveyId={surveyId} surveyTitle={surveyTitle} />
            )}
        </>
    );
}
