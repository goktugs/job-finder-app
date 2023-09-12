import { useState } from "react";
import { NavLink } from "react-router-dom";

export default function Header() {
  const [isNavOpen, setIsNavOpen] = useState(false);

  return (
    <header className="flex justify-between px-6 py-4 items-center">
      <div className="text-6xl text-red-900">Logo</div>

      <div className="flex items-center justify-between  ">
        <nav>
          <section className="MOBILE-MENU flex lg:hidden">
            <div
              className="HAMBURGER-ICON space-y-2"
              onClick={() => setIsNavOpen((prev) => !prev)}
            >
              <span className="block h-0.5 w-8 animate-pulse bg-main-green"></span>
              <span className="block h-0.5 w-8 animate-pulse bg-main-green"></span>
              <span className="block h-0.5 w-8 animate-pulse bg-main-green"></span>
            </div>

            <div className={isNavOpen ? "showMenuNav" : "hideMenuNav"}>
              {" "}
              <div
                className="CROSS-ICON absolute top-0 right-0 px-8 py-8"
                onClick={() => setIsNavOpen(false)}
              >
                <svg
                  className="h-8 w-8 text-main-green"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </div>
              <ul className="MENU-LINK-MOBILE-OPEN flex flex-col items-center justify-between min-h-[250px]">
                <li className=" my-8 uppercase text-white   ">
                  <NavLink
                    className={({ isActive }) =>
                      isActive
                        ? "text-white  bg-main-green py-4 px-8 rounded-xl border-2 border-white  "
                        : "animate-pulse"
                    }
                    to="/login"
                    onClick={() => setIsNavOpen(false)}
                  >
                    Login
                  </NavLink>
                </li>
                <li className=" my-8 uppercase text-white ">
                  <NavLink
                    className={({ isActive }) =>
                      isActive
                        ? "text-white bg-main-green py-4 px-8 rounded-xl font-bold border-4 border-white  "
                        : "animate-pulse"
                    }
                    to="/signup"
                    onClick={() => setIsNavOpen(false)}
                  >
                    Sign Up
                  </NavLink>
                </li>
              </ul>
            </div>
          </section>

          <ul className="DESKTOP-MENU hidden space-x-4 lg:flex">
            <li className=" my-8 uppercase px-8 py-4 rounded-xl text-main-gray ">
              <NavLink
                className={({ isActive }) =>
                  isActive
                    ? " font-bold border-b-2 bg-main-green px-8 py-2 border-main-purple hover:border-main-purple rounded-xl hover:border-b-2 transition duration-300 ease-in-out text-white"
                    : "px-8 py-2"
                }
                to="/login"
              >
                Login
              </NavLink>
            </li>
            <li className=" my-8 uppercase px-8 py-4 rounded-xl text-main-gray ">
              <NavLink
                className={({ isActive }) =>
                  isActive
                    ? " font-bold border-b-2 bg-main-green px-8 py-2 border-main-purple hover:border-main-purple rounded-xl hover:border-b-2 transition duration-300 ease-in-out text-white"
                    : "px-8 py-2"
                }
                to="/signup"
              >
                Sign Up
              </NavLink>
            </li>
          </ul>
        </nav>
        <style>{`
      .hideMenuNav {
        display: none;
      }
      .showMenuNav {
        display: block;
        position: absolute;
        width: 100%;
        height: 100vh;
        top: 0;
        left: 0;
        background: white;
        z-index: 10;
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        align-items: center;
        background: #303131;
      }
    `}</style>
      </div>
    </header>
  );
}
