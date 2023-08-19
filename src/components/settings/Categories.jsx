import CategoryCard from "./CategoryCard";

export default function Categories({ categoryInfo, setCategoryEditInfo }) {
    return (
        <div className='grid grid-cols-5 gap-12'>
            {
                categoryInfo.map((item, index) => (
                    <CategoryCard
                        key={index}
                        name={item.category_name}
                        img={item.icon_url}
                        id={item.category_id}
                        isActive={item.is_active}
                        setCategoryEditInfo={setCategoryEditInfo}
                    />
                ))
            }
        </div>
    );
}
