import { useState, useContext, useEffect } from "react";
import { PageContext } from "../../../contexts/InsightPageContext";

import makeRequest from "../../../utils/makeRequest";

import SectionContainer from "./helperComponents/SectionContainer";
import LayoutInput from "./helperComponents/LayoutInput";
import ImageDragDrop from "../../_helperComponents/ImgDragDrop";
import LayoutTextArea from "./helperComponents/LayoutTextArea";
import SubmitButton from "../helperComponents/SubmitButton";

export default function ThirdLayout() {
    const { pages, setPages, state } = useContext(PageContext);

    const insightId = sessionStorage.getItem("insightId");
    const initSections = { sectionImg: "", sectionTitle: "", sectionDesc: "" };
    const initLayout = {
        parent: insightId,
        pageType: 3,
        title: "",
        description: "",
        section: [{ ...initSections }],
    };

    const [layout, setLayout] = useState(initLayout);

    const handleSectionAdd = () => {
        const updatedLayout = { ...layout };
        updatedLayout.section.push(initSections);

        setLayout(updatedLayout);
    };

    const handleChange = (e, index) => {
        const name = e.target.name;
        const value = e.target.value;

        if (name === "sectionTitle" || name === "sectionDesc") {
            const updatedLayout = { ...layout };
            updatedLayout.section[index][name] = value;

            setLayout(updatedLayout);
            return;
        }

        setLayout({ ...layout, [name]: value });
    };

    const getImgUrl = async (e, index) => {
        e.preventDefault();

        const image = e.target.files[0];
        const formData = new FormData();
        formData.append("image", image);

        try {
            const response = await makeRequest(
                "insights/upload-insights-images",
                "POST",
                formData
            );

            if (!response.isSuccess) {
                throw new Error(response.message);
            }

            const updatedLayout = { ...layout };
            updatedLayout.section[index].sectionImg = response.data;

            setLayout(updatedLayout);
        } catch (error) {
            console.error(error);
        }
    };

    const handleSubmit = async () => {
        let route = "insights/add-insights-pages";
        let method = "POST";

        if (layout.id) {
            route = "insights/update-insight-pages";
            method = "PUT";
        }

        try {
            const response = await makeRequest(route, method, layout);

            if (!response.isSuccess) {
                throw new Error(response.message);
            }

            if (layout.id) {
                const updatedPages = [...pages];
                updatedPages[state.index] = layout;

                setPages(updatedPages);
            } else {
                const updatedPages = [
                    ...pages,
                    { ...layout, id: response.data },
                ];

                setPages(updatedPages);
            }
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        if (state.data) {
            setLayout(state.data);
        } else {
            setLayout(initLayout);
        }
    }, [state.data]);

    return (
        <>
            <LayoutInput
                name={"title"}
                value={layout.title}
                handleChange={handleChange}
            />

            <button
                className="bg-[#E6E6E6] px-8 py-2 rounded-2xl w-fit"
                onClick={handleSectionAdd}
            >
                <i className="fa-solid fa-plus"></i>
            </button>

            {layout.section.map((section, index) => (
                <SectionContainer key={index}>
                    <h2 className="text-[#EA8552] font-semibold text-xl">
                        Section {index + 1}
                    </h2>

                    <ImageDragDrop
                        name={"sectionImg"}
                        handleChange={(e) => getImgUrl(e, index)}
                    />

                    <LayoutInput
                        name={"sectionTitle"}
                        value={section.sectionTitle}
                        label={"title"}
                        handleChange={(e) => handleChange(e, index)}
                    />

                    <LayoutTextArea
                        name={"sectionDesc"}
                        value={section.sectionDesc}
                        label={"description"}
                        handleChange={(e) => handleChange(e, index)}
                    />
                </SectionContainer>
            ))}

            <LayoutTextArea
                name={"description"}
                value={layout.description}
                handleChange={handleChange}
            />
            <SubmitButton handleSubmit={handleSubmit} />
        </>
    );
}
