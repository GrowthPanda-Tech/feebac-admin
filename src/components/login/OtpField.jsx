import { useRef } from "react";

export default function OtpField({ quantity, inputData, inputOnChange }) {
    const inputRefs = Array.from({ length: quantity }, () => useRef(null));

    const handleInputChange = (event, index) => {
        const { value } = event.target;
        inputOnChange(event);
        if (value.length > 0 && index < quantity - 1) {
            inputRefs[index + 1].current.focus();
        }
    };

    const handleKeyUp = (event, index) => {
        if (event.key === "Backspace" && index > 0) {
            inputRefs[index - 1].current.focus();
        }
    };

    const renderInputFields = () => {
        return Array.from({ length: quantity }, (_, index) => (
            <input
                type="number"
                id={index + 1}
                key={index + 1}
                name={`i-${index}`}
                value={inputData[`i-${index}`] || ""}
                onChange={(event) => handleInputChange(event, index)}
                onKeyUp={(event) => handleKeyUp(event, index)}
                className="w-1/4 login-input px-0 text-center"
                ref={inputRefs[index]}
                required
            />
        ));
    };

    return <>{renderInputFields()}</>;
}
