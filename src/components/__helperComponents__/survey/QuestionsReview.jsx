import QuestionReview from "./helper/QuestionReview";

export default function QuestionsReview({ questionList }) {
  return (
    <>
      {questionList.map((question, index) => (
        <QuestionReview
          key={index}
          question={question}
          questionNumber={index + 1}
        />
      ))}
    </>
  );
}
