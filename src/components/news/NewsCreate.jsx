import NewsForm from "./NewsForm";
import PageTitle from "@helperComps/PageTitle";

export default function NewsCreate() {
  return (
    <div className="flex flex-col gap-8">
      <PageTitle name={"Create Quick Read"} />
      <NewsForm />
    </div>
  );
}
