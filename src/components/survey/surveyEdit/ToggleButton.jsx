import "./ToggleButton.css";
import { useState } from "react";
import makeRequest from "../../../utils/makeRequest";

export default function ToggleButton({ status, surveyId }) {
    const [isPublic, setIsPublic] = useState(status);

    const handleToggle = async () => {
        try {
            const response = await makeRequest(
                "/survey/toggle-survey-status",
                "PATCH",
                { surveyId }
            );

            if (!response.isSuccess) {
                throw new Error(response.message);
            }

            setIsPublic(!isPublic);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="toggle-container">
            <label className="slider-label">
                {isPublic ? "Public" : "Private"}
            </label>
            <div
                className={`slider ${isPublic ? "public" : "private"}`}
                onClick={handleToggle}
            >
                <div className="slider-thumb"></div>
            </div>
        </div>
    );
}
