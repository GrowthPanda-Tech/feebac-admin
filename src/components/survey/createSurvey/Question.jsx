import { useState } from "react";
import makeRequest from "../../../utils/makeRequest";

export default function Question({surveyId}) {
    //TODO: can i minimise the use of these
    const [options, setOptions] = useState(['', '']);
    const [questionNumber, setQuestionNumber] = useState(1);
    const [questionData, setQuestionData] = useState({
        'surveyId': surveyId,
        'questionType': 2,
    });

    const arrangeOptions = () => {
        let questionValue = {};
        for (let i = 0; i < options.length; i++) {
            questionValue[(i + 1).toString()] = options[i];
        }
        setQuestionData({...questionData, questionValue});
    }

    const removeOption = (index) => {
        const updatedOptions = options.filter((_, i) => i !== index);
        setOptions(updatedOptions);
    };

    const handleInputChange = (e) => setQuestionData({...questionData, [e.target.name]: e.target.value});

    const handleOptionChange = (e, index) => {
        const updatedOptions = [...options];
        updatedOptions[index] = e.target.value;
        setOptions(updatedOptions);

        //does this hamper performance
        arrangeOptions();
    }

    const handleQuestionSubmit = async () => {
        const response = await makeRequest('survey/add-question', 'POST', questionData);
        alert(response.message);
        setQuestionNumber(questionNumber + 1);
    }

    const handlePublish = async () => {
        const body = {
            surveyId,
            isStartNow: true
        }
        const response = await makeRequest('survey/start-survey', 'PATCH', body);
        alert(response.message);
    }

    console.log(questionData);

    return (
        <div className="flex flex-col gap-4">
            <div className="w-[95%]">
                <input type="text" placeholder={`Question ${questionNumber} :`} className="w-full mb-4 input-primary" name="questionTitle" onChange={handleInputChange} />
                <div className="flex justify-between">
                    <div className="flex gap-7">
                        <button className="btn-secondary" onClick={() => setQuestionData({...questionData, questionType: 1, questionValue: {}})}>Text Answer</button>
                        <button className="btn-secondary" onClick={() => setQuestionData({...questionData, questionType: 2})}>One Answer</button>
                        <button className="btn-secondary" onClick={() => setQuestionData({...questionData, questionType: 3})}>Multiple Answer</button>
                    </div>
                    <button onClick={() => setOptions([...options, ''])}>
                        <i className="fa-solid fa-plus"></i>
                    </button>
                </div>
                <div className="flex flex-col">
                    {
                        questionData.questionType === 1 ? <></> :
                        options.map((option, index) => (
                            <div key={index} className='mt-2 flex items-center justify-between'>
                                <input
                                    type="text"
                                    className="w-full input-primary border-secondary border-2"
                                    name="questionValue"
                                    value={option}
                                    onChange={(e) => handleOptionChange(e, index)}
                                />

                                <button className='ml-6' onClick={() => removeOption(index)}>
                                    <i className='fa-regular fa-trash-can text-xl text-black'></i>
                                </button>
                            </div>
                        ))
                    }
                </div>
            </div>
            <div className="flex gap-4">
                <button className="btn-primary w-fit" onClick={handleQuestionSubmit}> Submit </button>
                <button className="btn-secondary w-fit" onClick={handlePublish}> Publish </button>
            </div>
        </div>
    );
}

