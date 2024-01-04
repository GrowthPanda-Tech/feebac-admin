import { useParams } from "react-router-dom";
import ContentCreate from "./ContentCreate";

function SurveyContent() {
  const { slug } = useParams();
  return <ContentCreate surveyId={slug} />;
}

export default SurveyContent;
