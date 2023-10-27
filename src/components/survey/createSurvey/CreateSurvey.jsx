import { useState } from "react";
import CreateQuestions from "./CreateQuestions";
import CreateSurveyForm from "./CreateSurveyForm";

export default function CreateSurvey() {
    const [surveyId, setSurveyId] = useState(null);
    const [surveyTitle, setSurveyTitle] = useState(null);
    const [isSurveyCreate, setIsSurveyCreate] = useState(false);

    return (
        // <CreateQuestions
        //     surveyId={"0b49fb3d-c406-4722-ac26-2b754a74ad66"}
        //     surveyTitle={"Question Refactor Survey - Rahul"}
        // />
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
