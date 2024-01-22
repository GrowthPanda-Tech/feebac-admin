import PageTitle from "@/components/__helperComponents__/PageTitle";
import CurrentQuestion from "@/components/__helperComponents__/survey/CurrentQuestion";
import QuestionActions from "@/components/__helperComponents__/survey/QuestionActions";

export default function CreateQuestions({ surveyId, surveyTitle }) {
  return (
    <div className="flex flex-col gap-12">
      <PageTitle name={surveyTitle} />
      {/* <QuestionList /> */}
      <CurrentQuestion surveyId={surveyId} />
      <QuestionActions />
    </div>
  );
}
