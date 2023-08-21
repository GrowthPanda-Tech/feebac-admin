export default function Response({ index, survey }) {
    const type = survey.questionType === 'radio' ? 'Single-choice' : 'Multi-choice';

    return (
        <div className="flex flex-col gap-4">
            <div className="text-secondary font-semibold">
                Question {index + 1} ({type})
            </div>
            <div className="bg-white p-4 rounded-xl shadow-md border border-grey h-full">
                <div className="text-lg font-semibold leading-snug mb-8"> {survey.questionTitle} </div>
                {
                    survey.options.map((option, index) => (
                        <div key={index}>
                            <div className="mt-4 flex justify-between font-bold">
                                {option[1]}
                                <span className="font-normal"> { option[2] ? option[2] : 0 }% </span>
                            </div>

                            {/* Progress bar */}
                            <div
                                className="h-2 bg-secondary rounded-full"
                                style={{ width: `${ option[2] ? Math.floor(option[2]) : 0 }%` }}>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    );
}
