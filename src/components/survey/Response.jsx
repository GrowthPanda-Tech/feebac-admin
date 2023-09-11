export default function Response({ index, question }) {
    const type =
        question.questionType === "radio" ? "Single-choice" : "Multi-choice";

    return (
        <div className="flex flex-col gap-4">
            <div className="text-secondary font-semibold">
                Question {index + 1} ({type})
            </div>
            <div className="bg-white p-8 rounded-xl shadow-lg max-h-80 overflow-y-scroll">
                <div className="text-lg font-semibold leading-snug mb-8">
                    {question.questionTitle}
                </div>
                {question.options.map((option, index) => (
                    <div key={index} className="flex flex-col gap-2">
                        <div className="mt-4 flex justify-between font-bold">
                            {option[1]}
                            <span className="font-normal">
                                {option[2] ? option[2][1] : 0}%
                            </span>
                        </div>

                        {/* Progress bar */}
                        <div
                            className="h-2 bg-secondary rounded-full"
                            style={{
                                width: `${
                                    option[2] ? Math.floor(option[2][1]) : 0
                                }%`,
                            }}
                        />

                        {option[2] && option[2][0] > 0 && (
                            <div className="italic">
                                {option[2][0]} Response
                                {option[2][0] != 1 ? "s" : ""}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}
