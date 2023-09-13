export default function ReviewCard({ index, question }) {
    let type;
    if (question.question_type.type_name === "radio") {
        type = "Single-Choice";
    } else if (question.question_type.type_name === "checkbox")
        type = "Multiple-Choice";
    else if (question.question_type.type_name === "yes-no") {
        type = "Yes-No";
    } else type = "text";
    return (
        <>
            <div className="p-4">
                <div className="text-secondary mb-6 font-semibold">
                    Question {index + 1} ({type})
                </div>
                <div className="flex rounded-lg  bg-white h-full shadow-xl p-8 flex-col">
                    <div className="flex items-center mb-3">
                        <h2 className="text-black text-lg font-medium">
                            {question.question_title}
                        </h2>
                    </div>
                    <div className="flex flex-col justify-evenly flex-grow">
                        {Object.values(question.question_values).map(
                            (option, index) => (
                                <div
                                    key={index}
                                    className="flex flex-col gap-2"
                                >
                                    <div className="mt-4 flex justify-between font-bold">
                                        {option}
                                    </div>

                                    {option[2] && option[2][0] > 0 && (
                                        <div className="italic">
                                            {option[2][0]} Response
                                            {option[2][0] != 1 ? "s" : ""}
                                        </div>
                                    )}
                                </div>
                            )
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}
