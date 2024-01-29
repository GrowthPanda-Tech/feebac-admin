import QuestionTypeSelector from "./QuestionTypeSelector";

export default function QuestionReview(props) {
  const { question_title, question_type, question_values } =
    props.question || {};

  const optionsArr = Object.values(question_values);

  return (
    <div className="flex flex-col gap-12 rounded-md bg-white px-8 py-10">
      {/* Question Title */}
      <div className="flex flex-col gap-6">
        <span className="font-semibold">Question {props.questionNumber}</span>
        <span>{question_title}</span>
      </div>

      {/* Question Type Indicator */}
      <QuestionTypeSelector type={question_type.type_id} disabled />

      {/* Options */}
      <div className="flex flex-col gap-4">
        {optionsArr.map((element, index) => {
          if (Array.isArray(element)) {
            const [option, keyword] = element;
            return <span key={index}>{option}</span>;
          }

          return <span key={index}>{element}</span>;
        })}
      </div>
    </div>
  );
}
