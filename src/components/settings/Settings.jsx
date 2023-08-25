import { useState, useEffect } from 'react';
import CategoryForm from './CategoryForm'
import Categories from './Categories';
import makeRequest from '../../utils/makeRequest';
import Profiles from './filter/Profiles';
import FilterCreate from './filter/FilterCreate';
import FilterValCreate from './filter/FilterValCreate';

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
    //TODO: refactor
    const [isShowForm, setIsShowForm] = useState(false);
    const [isShowFilterCreate, setIsShowFilterCreate] = useState(false);
    const [isShowFilterValCreate, setIsShowFilterValCreate] = useState(false);
    const [visibleSection, setVisibleSection] = useState('category');
    const [categoryInfo, setCategoryInfo] = useState([]);

    const getCategoryInfo = async () => {
        const response = await makeRequest('site-admin/get-all-category', 'GET');
        response.isSuccess ? setCategoryInfo(response.categoryList) : alert(response.message);
    }

    //TODO: DEFINITELY REFACTOR THIS 
    const handleShow = (section) => {
        if (section === 'filter') {
            setIsShowFilterCreate(true);
            setIsShowFilterValCreate(false);
        } else if (section === 'filterVal') {
            setIsShowFilterCreate(false);
            setIsShowFilterValCreate(true);
        }
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
                                Category
                            </button>
                        )
                        :
                        (
                            <div className='flex gap-4'>
                                <button className='btn-primary' onClick={() => handleShow('filter')}>
                                    <i className='fa-solid fa-plus mr-3'></i>
                                    Filter Type
                                </button>
                                
                                <button className='btn-primary bg-accent' onClick={() => handleShow('filterVal')}>
                                    <i className='fa-solid fa-plus mr-3'></i>
                                    Filter Value
                                </button>
                            </div>
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

            {/* TODO: find a better way to do this */}
            { isShowForm && visibleSection === 'category' && <CategoryForm setIsShowForm={setIsShowForm} /> }
            { isShowFilterCreate && visibleSection === 'filter' && <FilterCreate setIsShowFilterCreate={setIsShowFilterCreate} /> }
            { isShowFilterValCreate && visibleSection === 'filter' && <FilterValCreate setIsShowFilterValCreate={setIsShowFilterValCreate} /> }

            { visibleSection === 'category' ? <Categories categoryInfo={categoryInfo} /> : <Profiles /> }
        </>
    );
}
