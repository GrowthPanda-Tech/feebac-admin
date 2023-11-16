import { useContext } from "react";
import { InsightContext } from "../../../contexts/InsightContext";

import makeRequest from "../../../utils/makeRequest";
import swal from "../../../utils/swal";

export default function SubmitButton() {
    const { insightModel } = useContext(InsightContext);

    const handleSubmit = async () => {
        const formData = new FormData();

        formData.append("image", insightModel.image, insightModel.image.name);

        insightModel.pages.forEach((page) => {
            formData.append("pages", page, page.name);
        });

        try {
            const response = await makeRequest(
                "insights/create-insights",
                "POST",
                formData
            );

            if (!response.isSuccess) {
                throw new Error(response.message);
            }

            swal("success", response.message);
        } catch (error) {
            swal("error", error.message);
        }
    };

    return (
        <button
            className="w-fit py-3 px-7 transition bg-[#EA525F] hover:bg-[#EA8552] text-white font-semibold rounded-xl"
            type="submit"
            onClick={handleSubmit}
        >
            Create Insight
        </button>
    );
}
