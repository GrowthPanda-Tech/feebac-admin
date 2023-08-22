import { useState, useEffect } from 'react';
import CategoryForm from './CategoryForm'
import Categories from './Categories';
import makeRequest from '../../utils/makeRequest';

export default function Settings() {
    const [isShowForm, setIsShowForm] = useState(false);
    const [categoryInfo, setCategoryInfo] = useState([]);
    const [categoryEditInfo, setCategoryEditInfo] = useState({});

    const getCategoryInfo = async () => {
        const response = await makeRequest('site-admin/get-all-category', 'GET');
        response.isSuccess ? setCategoryInfo(response.categoryList) : alert(response.message);
    }

    useEffect(() => {
        getCategoryInfo();
    }, []);

    return (
        <>
            <div className='flex justify-between items-center mb-6'>
                <h1 className='heading mb-0'> Category List </h1>
                <button className='btn-primary' onClick={() => setIsShowForm(true)}>
                    <i className='fa-solid fa-plus mr-3'></i>
                    Add New Category
                </button>
            </div>

            { isShowForm && <CategoryForm setIsShowForm={setIsShowForm} /> }

            <Categories categoryInfo={categoryInfo} setCategoryEditInfo={setCategoryEditInfo} />
        </>
    );
}
