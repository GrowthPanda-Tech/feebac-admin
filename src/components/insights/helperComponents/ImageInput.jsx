import { useState, useRef } from "react";

export default function ImageInput({ handleChange }) {
    const [imgName, setImgName] = useState(null);
    const imgRef = useRef(null);

    const handleImg = (e) => {
        handleChange(e);

        const fileName = e.target.files[0].name;
        setImgName(fileName);
    };

    return (
        <div className="flex gap-4 flex-col">
            <span className="capitalize font-semibold">Background Image</span>
            <input
                name="insightsImage"
                type="file"
                accept="image/*"
                ref={imgRef}
                onChange={handleImg}
                hidden
            />

            <div className="bg-white border border-[#1D1D1D] rounded-xl py-5 px-10 flex justify-between">
                <span>{imgName ? imgName : " "}</span>
                <span
                    className="text-secondary cursor-pointer hover:text-primary font-semibold"
                    onClick={() => imgRef.current.click()}
                >
                    Upload
                </span>
            </div>
        </div>
    );
}
