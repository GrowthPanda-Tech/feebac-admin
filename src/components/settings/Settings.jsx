import { useState } from 'react';
import CategoryCreateEdit from './CategoryCreateEdit'
import Categories from './Categories';

export default function Settings() {
    const [isShowCreateEdit, setIsShowCreateEdit] = useState(false);
    const toggleCreateEdit = () => setIsShowCreateEdit(!isShowCreateEdit);

    return (
        <>
            <div className='flex justify-between items-center mb-6'>
                <h1 className='heading'> Category List </h1>
                <button className='btn-primary' onClick={toggleCreateEdit}>
                    <i className={`fa-solid fa-angles-${isShowCreateEdit ? 'up' : 'down'} mr-3`}></i>
                    Add New Category
                </button>
            </div>

            { isShowCreateEdit && <CategoryCreateEdit /> }

            <Categories />
        </>
    );
}
