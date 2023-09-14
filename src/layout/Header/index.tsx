// fixme fazladan spinner fvar nerede bulamadım
// fixme Login signup logic profile kısmının yeri değişmesi lazım bence
// fixme burası bozuk düzeltilmesi gerek

import { useState } from "react";
import { useQuery } from "react-query";
import { NavLink, useNavigate } from "react-router-dom";
import { IUser } from "@/types/types";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import LoadingSpinner from "@/components/ui/loadingSpinner";
import { Button } from "@/components/ui/button";

export default function Header() {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const navigate = useNavigate();

  const isLoggedIn = localStorage.getItem("accessToken");

  const { data, isLoading } = useQuery<IUser>({
    queryKey: "user",
    queryFn: () =>
      fetch(`${import.meta.env.VITE_API_URL}/profile`, {
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${localStorage
            .getItem("accessToken")
            ?.replace(/"/g, "")}`,
        },
      }).then((res) => res.json()),
  });

  const exitHandler = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("id");
    window.location.reload();
  };

  return (
    <header className="flex justify-between px-6 py-4 items-center">
      <div
        className="w-32 h-32 md:w-44 md:h-44 hover:cursor-pointer"
        onClick={() => navigate("/")}
      >
        <img src="/logo.png" alt="logo" />
      </div>

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
              {isLoggedIn ? (
                isLoading ? (
                  <LoadingSpinner />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center space-y-8">
                    <Avatar className="w-48 h-48">
                      <AvatarImage
                        src={data?.profileImage}
                        alt="profileImage"
                      />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <div className="text-white text-2xl font-bold">
                      {data?.email}
                    </div>
                  </div>
                )
              ) : (
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
              )}
            </div>
          </section>
          <div>
            {isLoggedIn ? (
              <div className="hidden lg:flex my-8">
                {isLoading ? (
                  <LoadingSpinner />
                ) : (
                  <>
                    {" "}
                    <Avatar className="w-12 h-12">
                      <AvatarImage
                        src={data?.profileImage}
                        alt="profileImage"
                      />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col items-start justify-center ml-4">
                      <div className="text-main-gray text-lg font-bold">
                        {data?.email}
                      </div>
                      <Button onClick={exitHandler}>Exit</Button>
                    </div>
                  </>
                )}
              </div>
            ) : (
              <ul className="DESKTOP-MENU hidden space-x-4 lg:flex">
                {isLoading ? (
                  <LoadingSpinner />
                ) : (
                  <>
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
                  </>
                )}
              </ul>
            )}
          </div>
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
