import { NavLink } from "react-router-dom";

import dashboard from "../../assets/feebac-logo.png";
import dashboardIcon from "../../assets/navbar/dashboard.png";
import user from "../../assets/navbar/user.png";
import survey from "../../assets/navbar/survey.png";
import content from "../../assets/navbar/content.png";
import loyalty from "../../assets/navbar/loyalty.png";
import settings from "../../assets/navbar/settings.png";
import logout from "../../assets/navbar/logout.png";

function NavList({ link, title, icon }) {
    const isActive = ({ isActive }) => (isActive ? "active" : null);

    return (
        <NavLink
            to={link}
            className={`${isActive} px-16 py-4 text-white leading-6 tracking-wide flex items-center gap-8`}
        >
            <img src={icon} className="w-6" />
            <span> {title} </span>
        </NavLink>
    );
}

export default function Navbar() {
    const navItems = [
        { link: "/", title: "Dashboard", icon: dashboardIcon },
        { link: "user", title: "User Management", icon: user },
        { link: "survey", title: "Survey Management", icon: survey },
        { link: "content", title: "Content Management", icon: content },
        { link: "news", title: "News Management", icon: content },
        { link: "insights", title: "Insight Management", icon: content },
        {
            link: "loyalty-point",
            title: "Loyalty Point Management",
            icon: loyalty,
        },
        { link: "settings", title: "Settings", icon: settings },
    ];

    const handleLogout = () => {
        localStorage.removeItem("authToken");
        location.replace("/");
    };

    return (
        <div className="overflow-y-scroll no-scrollbar bg-primary h-screen w-80 fixed flex flex-col justify-between">
            <div>
                <img src={dashboard} className="w-full p-12 " />
                {navItems.map((item, index) => (
                    <NavList
                        key={index}
                        link={item.link}
                        title={item.title}
                        icon={item.icon}
                    />
                ))}
            </div>
            <div
                className="leading-6 tracking-wide flex items-center gap-8 bg-secondary hover:bg-accent cursor-pointer transition px-16 py-4 mb-12 text-white w-full"
                onClick={handleLogout}
            >
                <img src={logout} className="w-6" />
                Logout
            </div>
        </div>
    );
}
