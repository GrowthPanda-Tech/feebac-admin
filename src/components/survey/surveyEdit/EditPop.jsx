import React from "react";
import EditQuestion from "./editQuestion";
import { useState } from "react";

function EditPop({ question, type, setEditPop, surveyId, questionNo }) {
    const [editQuestion, setEditQuestion] = useState([question]);
    console.log(type, surveyId);
    console.log(editQuestion);

    return (
        <div className="fixed top-0 left-0 w-full flex justify-center items-center update-user h-[100vh] ">
            <div className="flex flex-col">
                <EditQuestion
                    surveyId={surveyId}
                    questions={editQuestion}
                    questionNo={questionNo}
                    setEditPop={setEditPop}
                />
            </div>
        </div>
    );
}

export default EditPop;
