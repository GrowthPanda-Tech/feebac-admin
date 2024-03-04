import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";

export const HeaderMenu = ({ profilePic }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <img
        src={profilePic}
        className="h-10 w-10 cursor-pointer rounded-full"
        onClick={() => setIsOpen((prev) => !prev)}
        alt="Profile"
      />
      {isOpen && (
        <div
          className="absolute right-0 mt-2 w-48 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="options-menu"
        >
          <div className="py-1" role="none">
            <Link
              to={"profile-update"}
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-[#EA525F] hover:text-white"
              role="menuitem"
            >
              Update Profile
            </Link>
            <Link
              to={"password-update"}
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-[#EA525F] hover:text-white"
              role="menuitem"
            >
              Update Password
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};
