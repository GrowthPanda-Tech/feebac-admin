import { useContext } from "react";
import { PageContext } from "../../../contexts/InsightPageContext";

import PagePill from "../helperComponents/PagePill";
import LayoutFactory from "../LayoutFactory";

//lord save me
import first from "../../../assets/insight-templates/01.png";
import second from "../../../assets/insight-templates/02.png";
import third from "../../../assets/insight-templates/03.png";
import fourth from "../../../assets/insight-templates/04.png";
import fifth from "../../../assets/insight-templates/05.png";
import sixth from "../../../assets/insight-templates/06.png";
import seventh from "../../../assets/insight-templates/07.png";
import eighth from "../../../assets/insight-templates/08.png";

const TEMPLATES = [first, second, third, fourth, fifth, sixth, seventh, eighth];

export default function InsightPageCreate() {
    const { pages, state, dispatch } = useContext(PageContext);

    return (
        <div className="flex flex-col gap-10">
            <span className="font-semibold text-lg capitalize">
                Choose Your Template
            </span>

            <div className="flex gap-8 justify-between overflow-x-scroll no-scrollbar">
                {TEMPLATES.map((template, index) => (
                    <img
                        key={index}
                        src={template}
                        className={`w-40 transition cursor-pointer rounded-lg ${
                            state.pageType === index + 1
                                ? "border-2 border-accent"
                                : "border-[#1D1D1D] opacity-75"
                        }`}
                        onClick={() =>
                            dispatch({
                                type: "LAYOUT",
                                pageType: index + 1,
                                data: null,
                                index: null,
                            })
                        }
                    />
                ))}
            </div>

            <div className="flex gap-4">
                {pages.map((page, index) => (
                    <PagePill
                        key={index}
                        index={index}
                        active={state.activePage === index}
                        onClick={() =>
                            dispatch({
                                type: "PAGE",
                                pageType: page.pageType,
                                activePage: index,
                                data: page,
                                index: index,
                            })
                        }
                    />
                ))}
            </div>

            <div className="bg-white flex flex-col rounded-xl p-10 gap-7">
                <LayoutFactory activeLayout={state.pageType} />
            </div>
        </div>
    );
}
