import React from "react";
import EditSurveyForm from "./EditSurveyForm";

function EditSurveyDetails({ setSurveyEditPop, surveyInfo, setSurveyInfo }) {
    return (
        <div className="fixed top-0 left-0 w-full flex justify-center items-center update-user h-[100vh] ">
            <div className="w-[75%] p-8 rounded-md bg-white flex flex-col">
                <EditSurveyForm
                    setSurveyEditPop={setSurveyEditPop}
                    surveyInfo={surveyInfo}
                    setSurveyInfo={setSurveyInfo}
                />
            </div>
        </div>
    );
}

export default EditSurveyDetails;
