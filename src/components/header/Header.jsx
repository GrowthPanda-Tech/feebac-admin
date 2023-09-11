import defaultUser from "../../assets/defaultUser.png";

export default function Header() {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    const baseUrl = import.meta.env.VITE_BACKEND_URL;

    return (
        <header className="flex justify-end py-8 bg-white">
            <div className="flex gap-4 mr-16">
                <div className="flex flex-col items-end">
                    <div className="font-bold">
                        {userInfo.first_name} {userInfo.last_name}
                    </div>
                    {/* TODO: Dynamic user role */}
                    <div className="text-grey">Admin</div>
                </div>
                <img
                    src={
                        userInfo.profile_pic
                            ? baseUrl + userInfo.profile_pic
                            : defaultUser
                    }
                    className="h-10 w-10 rounded-full"
                    alt={defaultUser}
                />
            </div>
        </header>
    );
}
