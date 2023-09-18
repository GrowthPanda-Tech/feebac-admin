import React from "react";

function EditPop({ question, type, setEditPop, surveyId }) {
    console.log(question, "from eidt pop");
    console.log(type, surveyId);
    return (
        <div className="fixed top-0 left-0 w-full flex justify-center items-center update-user h-[100vh] ">
            This is a edit Pop
            <div>
                <button
                    className="btn-secondary"
                    onClick={() => {
                        setEditPop(false);
                    }}
                >
                    Cancle
                </button>
            </div>
        </div>
    );
}

export default EditPop;
