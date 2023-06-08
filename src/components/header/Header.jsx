import defaultUser from '../../assets/defaultUser.png';

function UserSection() {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    const baseUrl = import.meta.env.VITE_BACKEND_URL;
    return (
        <div className='flex gap-4'>
            <div className='flex flex-col items-end'>
                <div className='font-bold'>{userInfo.first_name} {userInfo.last_name}</div>
                {/* TODO: Dynamic user role */}
                <div className='text-grey'>Admin</div>
            </div>
            <img src={baseUrl+userInfo.profile_pic} className='h-10 w-10 rounded-full' alt={defaultUser}  />
            {/* <i className='fa-solid fa-chevron-down'></i> */}
        </div>
    );
}

export default function Header() {

    const handleLogout = () => {
        localStorage.removeItem("authToken");
        localStorage.removeItem("userInfo");
        location.replace("/");
    }

    return (
        <header className='flex justify-evenly items-center py-8 bg-white'>
            <div className='bg-background rounded-xl'>
                <i className='fa-solid fa-magnifying-glass ml-3'></i>
                <input type="text" className='p-3 bg-background rounded-xl outline-0' placeholder="Search" />
            </div>
            <div className='flex gap-12 items-center'>
                <UserSection />
                <div>
                    {/* <i className="fa-regular fa-bell"></i> */}
                    <i className="fa-solid fa-arrow-right-from-bracket text-xl cursor-pointer text-grey hover:text-black" onClick={handleLogout}></i>
                </div>
            </div>
        </header>
    );
}
