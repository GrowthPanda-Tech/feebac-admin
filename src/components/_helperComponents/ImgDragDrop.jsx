import { useState, useRef } from "react";

import upload from "../../assets/upload.png";

export default function ImageDragDrop({ name, handleChange }) {
    const [isDragging, setIsDragging] = useState(false);
    const [img, setImg] = useState({
        name: null,
        preview: null,
    });

    const imgRef = useRef(null);

    const handleDrop = (e) => {
        e.preventDefault();

        if (e.dataTransfer.items) {
            [...e.dataTransfer.items].forEach((item) => {
                if (item.kind === "file") {
                    const file = item.getAsFile();
                }
            });
        } else {
            [...e.dataTransfer.files].forEach((file) => {});
        }

        setIsDragging(false);
    };

    const handleDragover = (e) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleImg = async (e) => {
        try {
            await handleChange(e);

            const name = e.target.files[0].name;
            setImg({ ...img, name });
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="flex flex-col gap-6">
            <span className="font-semibold">Upload Image</span>
            <div
                className={`transition flex flex-col gap-6 items-center justify-center py-6 border-dashed border-2 border-black rounded-xl ${
                    isDragging ? "bg-white border-secondary" : ""
                }`}
                onDrop={handleDrop}
                onDragOver={handleDragover}
                onDragLeave={() => setIsDragging(false)}
            >
                <img src={upload} className="w-12" />
                <div className="flex gap-2">
                    <span className={`font-semibold text-xl text-secondary`}>
                        Drag & Drop
                    </span>
                    <span className="font-semibold text-xl">Image</span>
                </div>
                <div className="font-medium flex gap-2">
                    <span>Or</span>
                    <span
                        className={`text-secondary cursor-pointer hover:text-primary underline`}
                        onClick={() => imgRef.current.click()}
                    >
                        browse files
                    </span>
                    <span>
                        on your computer {img.name ? `(${img.name})` : null}
                    </span>
                </div>
            </div>

            <input
                onChange={handleImg}
                ref={imgRef}
                type="file"
                accept="image/*"
                name={name}
                hidden
            />
        </div>
    );
}
