import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";
import Me from "@/components/Me/Me";
import { useLoggedInSlice } from "@/store/isLoggedIn";

export default function Header() {
  const [lang, setLang] = useState("en");

  const { i18n, t } = useTranslation();

  const [isNavOpen, setIsNavOpen] = useState(false);
  const navigate = useNavigate();

  const changeLangHandler = async (lang: string) => {
    await i18n.changeLanguage(lang);
  };

  const isLoggedIn = useLoggedInSlice((state) => state.isLoggedIn);

  return (
    <header className="flex justify-between px-6 py-4 items-center">
      <div
        className="w-32 h-32 md:w-44 md:h-44 hover:cursor-pointer"
        onClick={() => navigate("/")}
      >
        <img src="/logo.png" alt="logo" />
      </div>
      <div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">{t("language")}</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>{t("selectLang")}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuRadioGroup
              value={lang}
              onValueChange={(value) => {
                setLang(value);
                changeLangHandler(value);
              }}
            >
              <DropdownMenuRadioItem value="en">
                {t("en")}
              </DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="tr">
                {t("tr")}
              </DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="flex items-center justify-between ml-auto  ">
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
              {isLoggedIn ? (
                <Me />
              ) : (
                <>
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
                </>
              )}
            </div>
          </section>
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
