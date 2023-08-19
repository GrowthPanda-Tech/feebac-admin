import noImg from "../../assets/noImg.jpg";
import makeRequest from "../../utils/makeRequest";
import { useState } from "react";

export default function CategoryCard({ name, img, id, isActive, setCategoryEditInfo }) {
    const baseUrl = import.meta.env.VITE_BACKEND_URL;
    img = img == null ? noImg : baseUrl + img;

    const [cardStatus, setCardStatus] = useState(isActive);

    const handleStatus = async () => {
        const response = await makeRequest('site-admin/toggle-category-status', 'PATCH', { categoryId: id});
        alert(response.message);
        setCardStatus(!cardStatus);
    }

    const handleEdit = () => {
        console.log('Edit btn clicked');
    }

    return (
        <div className={`flex flex-col shadow-lg rounded-xl relative bg-white ${cardStatus ? 'opacity-100' : 'opacity-50'}`}>
            <div className="z-10 absolute right-0 mr-3 mt-3">
                <button onClick={handleStatus}>
                    <i className={`fa-solid fa-${cardStatus ? 'ban' : 'check'}`}></i>
                </button>
                {/* <button className="ml-2" onClick={handleEdit}> */}
                {/*     <i className="fa-solid fa-pen-to-square"></i> */}
                {/* </button> */}
            </div>

            <img src={img} className='rounded-xl h-4/5'/>

            <span className='capitalize font-bold flex items-center justify-center h-1/5'>
                {name}
            </span>
        </div>
    );
}
