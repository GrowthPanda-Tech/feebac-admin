import { useState } from "react"
import ContentForm from "./ContentForm";
import defaultImgPreview from "../../assets/defaultImgPreview.png";

export default function ContentCreate() {
    const [imgPreview, setImgPreview] = useState(defaultImgPreview);

    const handleImageChange = (e) => {
        const file = e.target.files[0];

        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setImgPreview(reader.result);
            }
            reader.readAsDataURL(file);
        }
    }

    return (
        <>
            <h1 className="heading"> Create New Article </h1>
            <div className="flex gap-8">
                <div className="w-3/4">
                    <ContentForm handleImageChange={handleImageChange} />
                </div>

                <div className="w-1/4 h-60 p-4 rounded-xl bg-white flex items-center justify-center">
                    <img src={imgPreview} className="max-h-full max-w-full" />
                </div>
            </div>
        </>
    );
}
