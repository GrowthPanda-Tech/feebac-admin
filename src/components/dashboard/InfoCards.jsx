import React from "react";
import "./infocard.css";

function InfoCards({ title, value }) {
    return (
        <div className="flex items-center flex-col m-2 mb-4 w-full  text-center">
            <div className="bg-white relative text-black w-full  rounded-lg">
                <div className="flex flex-col justify-evenly items-center p-10 text-center h-56 ">
                    <h1 className="text-xl font-semibold">{title}</h1>
                    <h1 className="text-5xl text-[#EA8552] font-semibold">
                        {value}
                    </h1>
                </div>
                <div className="absolute bottom-[-1rem] ">
                    <svg
                        className="waves"
                        xmlns="http://www.w3.org/2000/svg"
                        xmlnsXlink="http://www.w3.org/1999/xlink"
                        viewBox="0 24 150 28"
                        preserveAspectRatio="none"
                        shapeRendering="auto"
                    >
                        <defs>
                            <path
                                id="gentle-wave"
                                d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z"
                            />
                        </defs>
                        <g className="parallax">
                            <use
                                xlinkHref="#gentle-wave"
                                x="48"
                                y="3"
                                fill="rgba(234, 82, 95, 1)"
                            />
                            <use
                                xlinkHref="#gentle-wave"
                                x="48"
                                y="5"
                                fill="rgba(255,255,255,0.3)"
                            />
                            {/* <use
                                xlinkHref="#gentle-wave"
                                x="48"
                                y="7"
                                fill="rgba(255,255,255,0.3)"
                            /> */}
                        </g>
                    </svg>
                </div>
            </div>
        </div>
    );
}

export default InfoCards;
