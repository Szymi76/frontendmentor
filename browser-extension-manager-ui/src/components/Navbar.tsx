import { useDarkMode } from "../hooks/useDarkMode";
import { ReactSVG } from "react-svg";

import Logo from "../../public/logo.svg";
import MoonIcon from "../../public/icon-moon.svg";
import SunIcon from "../../public/icon-sun.svg";

export const Navbar = () => {
  const { isDarkMode, toggleDarkMode } = useDarkMode();

  return (
    <nav className="navbar mt-5 mx-2">
      <div className="container-md bg-neutral py-2 rounded-4 shadow-sm max-page-width">
        <ReactSVG id="main-logo" src={Logo} className="py-1" />
        <button
          className="btn btn-navbar border-0 p-2 d-flex focus-ring"
          onClick={toggleDarkMode}
        >
          <img
            src={isDarkMode ? SunIcon : MoonIcon}
            alt="Moon icon"
            height={20}
            width={20}
          />
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
