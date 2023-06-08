import CategoryCard from "./CategoryCard";
import makeRequest from "../../utils/makeRequest";
import { useState, useEffect } from "react";

export default function Categories() {
    const [categoryInfo, setCategoryInfo] = useState();

    const getCategoryInfo = async () => {
        const response = await makeRequest('site-admin/get-all-category', 'GET');
        setCategoryInfo(response);
    }

    useEffect(() => {
        getCategoryInfo();
    }, []);

    return (
        <div className='grid grid-cols-5 gap-12'>
            {
                categoryInfo != null && categoryInfo.categoryList.map((item, index) => (
                    <CategoryCard
                        key={index}
                        name={item.category_name}
                        img={item.icon_url}
                        id={item.category_id}
                        isActive={item.is_active}
                    />
                ))
            }
        </div>
    );
}
