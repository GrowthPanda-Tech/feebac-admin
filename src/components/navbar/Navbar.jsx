import { useState } from "react";
import { NavLink } from "react-router-dom";

function NavList({ link, title, isActive, onClick }) {
    return (
        <li className={ `${isActive ? 'bg-secondary': ''}`} onClick={onClick}>
            <NavLink to={link}>
                <div className="px-16 py-4 text-white leading-6 tracking-wide flex items-center">
                    {title}
                </div>
            </NavLink>
        </li>
    );
}

export default function Navbar() {
    const navItems = [
        { link: '/', title: 'Dashboard'},
        { link: 'user', title: 'User Management'},
        { link: 'survey', title: 'Survey Management'},
        { link: 'content', title: 'Content Management'},
        { link: 'loyalty-point', title: 'Loyalty Point Management'},
        { link: 'revenue', title: 'Revenue Management'},
        { link: 'analytics', title: 'Analytics'},
        { link: 'settings', title: 'Settings'},
    ];

    const [isActive, setIsActive] = useState();
    const onClick = (link) => setIsActive(link);

    return (
        <div className="bg-primary h-screen w-80 fixed">
            <ul>
                {
                    navItems.map((item, index) => (
                        <NavList 
                            key={index}
                            link={item.link}
                            title={item.title}
                            isActive={isActive === item.link}
                            onClick={() => onClick(item.link)}
                        />
                    ))
                }
            </ul>
        </div>
    );
}
