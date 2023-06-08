export default function imgPreview(event, setImagePreview) {
    const file = event.target.files[0];
    setImageFile(file);

    if (file) {
        const reader = new FileReader();
        reader.onload = () => {
            setImagePreview(reader.result);
        };
        reader.readAsDataURL(file);
    } else {
        setImagePreview(null);
    }
};

