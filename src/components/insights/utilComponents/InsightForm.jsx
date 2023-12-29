import ImageInput from "../helperComponents/ImageInput";
import PageFactory from "../helperComponents/PageFactory";
import SubmitButton from "../helperComponents/SubmitButton";

export default function InsightForm({ data, setter }) {
  return (
    <>
      <ImageInput image={data.image} setter={setter} />
      <PageFactory data={data} setter={setter} />
      <SubmitButton data={data} setter={setter} />
    </>
  );
}
