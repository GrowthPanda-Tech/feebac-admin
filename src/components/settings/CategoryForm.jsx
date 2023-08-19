import { useState } from 'react';
import noImg from "../../assets/noImg.jpg";
import formSubmit from '../../utils/formSubmit';

export default function CategoryForm({setIsShowForm}) {
    const [categoryInfo, setCategoryInfo] = useState({});
    const [imgPreview, setImgPreview] = useState(noImg);

    const onChange = (event) => {
        if (event.target.name === 'categoryName') {
            setCategoryInfo({...categoryInfo, categoryName: event.target.value})
            return;
        }

        //TODO: can i export this to utils?
        const file = event.target.files[0];
        setCategoryInfo({...categoryInfo, categoryImg: file});

        if (file) {
            const reader = new FileReader();
            reader.onload = () => setImgPreview(reader.result);
            reader.readAsDataURL(file);
        } else {
            setImgPreview(noImg);
        }
    }

    const handleSubmit = async (e) => {
        const formdata = new FormData();
        formdata.append("categoryName", categoryInfo.categoryName);
        formdata.append("categoryImg", categoryInfo.categoryImg, categoryInfo.categoryImg.name);

        const response = await formSubmit(e, 'site-admin/add-category', 'POST', formdata);

        response.isSuccess ? alert("Category added") : alert(response.message);
    }

    console.log(categoryInfo);
    return (
        <div className='bg-white rounded-xl mb-8 p-10 flex gap-11'>
            <div className='w-1/5'>
                <img src={imgPreview} />
            </div>
            <div className='w-4/5'>
                <form onSubmit={handleSubmit} className='flex flex-col h-full justify-evenly gap-8'>
                    <label className='flex flex-col font-semibold'>
                        Enter Category Name *
                        <input type='text' name='categoryName' className='input-primary' onChange={onChange} required />
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
                        <button className='btn-secondary' onClick={() => setIsShowForm(false)}> Cancel </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
