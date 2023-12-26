import EditSurveyForm from "./EditSurveyForm";

function EditSurveyDetails({ setSurveyEditPop, surveyInfo, setSurveyInfo }) {
  return (
    <div className="update-user fixed left-0 top-0 flex h-[100vh] w-full items-center justify-center ">
      <div className="flex w-[75%] flex-col rounded-md bg-white p-8">
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
