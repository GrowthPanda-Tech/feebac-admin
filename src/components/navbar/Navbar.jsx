import { useMemo } from "react";
import { v4 as uuidv4 } from "uuid";

import dashboard from "@/assets/feebac-logo.png";
import dashboardIcon from "@/assets/navbar/dashboard.png";
import user from "@/assets/navbar/user.png";
import survey from "@/assets/navbar/survey.png";
import content from "@/assets/navbar/content.png";
import loyalty from "@/assets/navbar/loyalty.png";
import settings from "@/assets/navbar/settings.png";
import logout from "@/assets/navbar/logout.png";

import NavList from "@helperComps/NavList";

class NavItem {
  constructor(link, title, icon) {
    this.key = uuidv4();
    this.link = link;
    this.title = title;
    this.icon = icon;
  }
}

export default function Navbar() {
  const navItems = useMemo(
    () => [
      new NavItem("/", "Dashboard", dashboardIcon),
      new NavItem("user", "User Management", user),
      new NavItem("survey", "Survey Management", survey),
      new NavItem("content", "Article Management", content),
      new NavItem("news", "Quick Read Management", content),
      new NavItem("insights", "Case Study Management", content),
      new NavItem("loyalty-point", "Loyalty Point Management", loyalty),
      new NavItem("settings", "Settings", settings),
    ],
    [],
  );

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    location.replace("/");
  };

  return (
    <div className="no-scrollbar fixed flex h-screen w-80 flex-col justify-between overflow-y-scroll bg-primary">
      <div>
        <img src={dashboard} className="w-full p-12 " />
        {navItems.map(({ key, link, title, icon }) => (
          <NavList key={key} link={link} title={title} icon={icon} />
        ))}
      </div>
      <div
        className="mb-12 flex w-full cursor-pointer items-center gap-8 bg-secondary px-16 py-4 leading-6 tracking-wide text-white transition hover:bg-accent"
        onClick={handleLogout}
      >
        <img src={logout} className="w-6" />
        Logout
      </div>
    </div>
  );
}
