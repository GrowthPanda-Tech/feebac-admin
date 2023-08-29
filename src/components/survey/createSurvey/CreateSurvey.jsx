import { useState } from "react";
import Form from "./Form";
import Question from "./Question";
import SurveyContextProvider from "../../../contexts/SurveyContext";

export default function CreateSurvey() {
    const [surveyId, setSurveyId] = useState(null);
    const [surveyTitle, setSurveyTitle] = useState(null);
    const [isSurveyCreate, setIsSurveyCreate] = useState(false);

    return (
        <>
            {!isSurveyCreate ? (
                <SurveyContextProvider>
                    <Form
                        setSurveyId={setSurveyId}
                        setSurveyTitle={setSurveyTitle}
                        setIsSurveyCreate={setIsSurveyCreate}
                    />
                </SurveyContextProvider>
            ) : (
                <Question surveyId={surveyId} surveyTitle={surveyTitle} />
            )}
        </>
    );
}
