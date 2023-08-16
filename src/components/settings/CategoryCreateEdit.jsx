import { useState } from 'react';
import noImg from "../../assets/noImg.jpg";
import formSubmit from '../../utils/formSubmit';

export default function CategoryCreateEdit() {
    const [categoryCreate, setCategoryCreate] = useState({ categoryName: "", categoryImg: null });
    const [imgPreview, setImgPreview] = useState(noImg);

    const onChange = (e) => {
        if (e.target.name === 'categoryImg') {
            const file = e.target.files[0];
            setCategoryCreate({...categoryCreate, categoryImg: file});

            if (file) {
                const reader = new FileReader();
                reader.onload = () => {
                    setImgPreview(reader.result);
                }
                reader.readAsDataURL(file);
            } else {
                setImgPreview(noImg);
            }
        } else {
            setCategoryCreate({...categoryCreate, categoryName: e.target.value});
        }

    }

    const handleSubmit = async (e) => {
        const formdata = new FormData();
        formdata.append("categoryName", categoryCreate.categoryName);
        formdata.append("categoryImg", categoryCreate.categoryImg, categoryCreate.categoryImg.name);

        const response = await formSubmit(e, 'site-admin/add-category', 'POST', formdata);

        if (response.isSuccess) {
            alert("Category added");
        } else {
            alert(response.message);
        }
    }

    return (
        <div className='bg-white rounded-xl mb-8 p-10 flex gap-11'>
            <div className='w-1/5'>
                <img src={imgPreview} />
            </div>
            <div className='w-4/5'>
                <form onSubmit={handleSubmit} className='flex flex-col h-full justify-evenly'>
                    <label className='flex flex-col font-semibold'>
                        Enter Category Name
                        <input type='text' name='categoryName' className='input-primary' value={categoryCreate.categoryName} onChange={onChange} required />
                    </label>
                    <label className='flex flex-col font-semibold'>
                        Upload Image (JPG/PNG)
                        <input
                            type='file'
                            className='input-primary'
                            accept='.jpg, .png'
                            name='categoryImg'
                            onChange={onChange}
                        />
                    </label>
                    <div className='flex gap-4'>
                        <button className='btn-primary'> Save </button>
                        <button className='btn-secondary'> Cancel </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
