import SurveySelection from "@utilComps/SurveySelection";

import ImageInput from "../helperComponents/ImageInput";
import PageFactory from "../helperComponents/PageFactory";
import SubmitButton from "../helperComponents/SubmitButton";

export default function InsightForm({ data, setter }) {
  return (
    <>
      <div className="flex gap-10">
        <ImageInput image={data.image} setter={setter} />
        <SurveySelection survey={data.survey.id} setter={setter} />
      </div>
      <PageFactory data={data} setter={setter} />
      <SubmitButton data={data} setter={setter} />
    </>
  );
}
