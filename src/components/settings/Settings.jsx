import { useState, useEffect } from 'react';
import CategoryForm from './CategoryForm'
import Categories from './Categories';
import makeRequest from '../../utils/makeRequest';
import Profiles from './filter/Profiles';

function Pill({ section, isActive, onClick }) {
    return (
        <div
            className={`cursor-pointer ${isActive ? 'pill-primary' : 'pill-secondary'}`}
            onClick={onClick}>
            {section} List
        </div>
    );
}

export default function Settings() {
    const [isShowForm, setIsShowForm] = useState(false);
    const [visibleSection, setVisibleSection] = useState('category');
    const [categoryInfo, setCategoryInfo] = useState([]);

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
                <h1 className='heading mb-0'>Settings</h1>
                {
                    visibleSection === 'category' ?
                        (
                            <button className='btn-primary' onClick={() => setIsShowForm(true)}>
                                <i className='fa-solid fa-plus mr-3'></i>
                                Add New Category
                            </button>
                        )
                        :
                        (
                            <button className='btn-primary bg-accent'>
                                <i className='fa-solid fa-plus mr-3'></i>
                                Add New Filter
                            </button>
                        )
                }
            </div>

            <div className='flex gap-4 mb-8'>
                <Pill
                    section={'Category'}
                    isActive={visibleSection === 'category'}
                    onClick={() => setVisibleSection('category')}
                />
                <Pill
                    section={'Filter'}
                    isActive={visibleSection === 'filter'}
                    onClick={() => setVisibleSection('filter')}
                />
            </div>

            { isShowForm && <CategoryForm setIsShowForm={setIsShowForm} /> }

            { visibleSection === 'category' ? <Categories categoryInfo={categoryInfo} /> : <Profiles /> }
        </>
    );
}
