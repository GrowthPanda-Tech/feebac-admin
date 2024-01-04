import { NavLink } from "react-router-dom";

export default function NavList({ link, title, icon }) {
  const isActive = ({ isActive }) => (isActive ? "active" : null);

  return (
    <NavLink
      to={link}
      className={`${isActive} flex items-center gap-8 px-16 py-4 leading-6 tracking-wide text-white`}
    >
      <img src={icon} className="w-6" />
      <span> {title} </span>
    </NavLink>
  );
}
