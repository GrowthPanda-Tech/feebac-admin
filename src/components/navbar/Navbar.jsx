import { NavLink } from "react-router-dom";
import dashboard from "../../assets/dashboard.svg";

//TODO: this feels illegal
import dashboardIcon from "../../assets/navbar/dashboard.png";
import user from "../../assets/navbar/user.png";
import survey from "../../assets/navbar/survey.png";
import content from "../../assets/navbar/content.png";
import loyalty from "../../assets/navbar/loyalty.png";
import revenue from "../../assets/navbar/revenue.png";
import analytics from "../../assets/navbar/analytics.png";
import settings from "../../assets/navbar/settings.png";

function NavList({ link, title, icon }) {
    return (
        <NavLink
            to={link}
            className={
                "px-16 py-4 text-white leading-6 tracking-wide flex items-center gap-8"
            }
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
        {
            link: "loyalty-point",
            title: "Loyalty Point Management",
            icon: loyalty,
        },
        { link: "revenue", title: "Revenue Management", icon: revenue },
        { link: "analytics", title: "Analytics", icon: analytics },
        { link: "settings", title: "Settings", icon: settings },
    ];

    return (
        <div className="bg-primary h-screen w-80 fixed">
            <img src={dashboard} className="w-full p-12" />
            <>
                {navItems.map((item, index) => (
                    <NavList
                        key={index}
                        link={item.link}
                        title={item.title}
                        icon={item.icon}
                    />
                ))}
            </>
        </div>
    );
}
