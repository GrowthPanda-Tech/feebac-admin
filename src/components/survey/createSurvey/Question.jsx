import { useState } from "react";
import makeRequest from "../../../utils/makeRequest";

function OptionsTypeBtn({ onClick, title }) {
    return (
        <button
            className="btn-secondary"
            onClick={onClick}>
            {title}
        </button>
    )
}

export default function Questions({ surveyId, qtypeClick }) {
    const [options, setOptions] = useState(['', '']);
    const [questionData, setQuestionData] = useState({
        'surveyId': surveyId,
        'questionType': 2,
    });

    function handleInputChange(e) {
        setQuestionData({...questionData, [e.target.name]: e.target.value})
    }

    function handleOptionChange(e, index) {
        const updatedOptions = [...options];
        updatedOptions[index] = e.target.value;
        setOptions(updatedOptions);
    }

    function addOption() {
        setOptions([...options, '']);
    }

    function removeOption(index) {
        const updatedOptions = options.filter((_, i) => i !== index);
        setOptions(updatedOptions);
    };

    async function handleQuestionSubmit() {
        let questionValue = {};
        for (let i = 0; i < options.length; i++) {
            questionValue[(i + 1).toString()] = options[i];
        }
        setQuestionData({...questionData, questionValue})
        const response = await makeRequest('survey/add-question', 'POST', questionData);
        console.log(response);
    }

    return (
        <div className="flex flex-col">
            <div className="w-[95%]">
                <div className="font-medium mb-6 flex justify-between gap-8 items-center">
                    <input type="text" placeholder="Type your question" className="w-full input-primary" name="questionTitle" onChange={handleInputChange} />
                </div>
                <div className="flex justify-between">
                    <div className="flex gap-7">
                        <OptionsTypeBtn onClick={() => qtypeClick({"1": "text"})} title={"Text Messages"} />
                        <OptionsTypeBtn onClick={() => qtypeClick({"2": "radio"})} title={"One Answer"} />
                        <OptionsTypeBtn onClick={() => qtypeClick({"3": "checkbox"})} title={"Multiple Answer"} />
                    </div>
                    <button onClick={addOption}>
                        <i className="fa-solid fa-plus"></i>
                    </button>
                </div>
                <div className="flex flex-col mt-6">
                    {
                        options.map((option, index) => (
                            <div key={index} className='py-5 flex items-center justify-between'>
                                <input
                                    type="text"
                                    placeholder="and your options"
                                    className="w-full input-primary border-secondary border-2"
                                    name="questionValue"
                                    value={option}
                                    onChange={(e) => handleOptionChange(e, index)}
                                />

                                <button className="ml-6" onClick={() => removeOption(index)}>
                                    <i className="fa-regular fa-trash-can text-xl text-black"></i>
                                </button>
                            </div>
                        ))
                    }
                </div>
            </div>
            <button onClick={handleQuestionSubmit}> Submit </button>
        </div>
    );
}

