import PageTitle from "../../PageTitle";
import FormInput from "../helperComponents/FormInput";
import ImageInput from "../helperComponents/ImageInput";
import PageFactory from "../helperComponents/PageFactory";
import SubmitButton from "../helperComponents/SubmitButton";

export default function InsightCreate() {
  return (
    <div className="flex flex-col gap-8">
      <PageTitle name={"Create Insight"} />
      <ImageInput label={"Background Image"} name={"image"} />
      <FormInput />
      <PageFactory />
      <SubmitButton />
    </div>
  );
}
