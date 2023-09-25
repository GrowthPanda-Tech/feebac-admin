import React, { useState } from "react";
import "./ToggleButton.css";
import { useEffect } from "react";
import makeRequest from "../../../utils/makeRequest";

function ToggleButton({ surveyInfo, surveyId }) {
    const [isPublic, setIsPublic] = useState();

    console.log(surveyId);

    const handleToggle = async () => {
        const body = {
            surveyId,
        };
        const response = await makeRequest(
            "/survey/toggle-survey-status",
            "PATCH",
            body
        );
        if (response.isSuccess) setIsPublic(!isPublic);
    };

    console.log(isPublic);
    useEffect(() => {
        setIsPublic(surveyInfo?.is_public);
    }, [surveyInfo]);

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

export default ToggleButton;
