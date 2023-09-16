import Header from "./Header";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import Main from "./Main";

export default function Layout() {
  return (
    <>
      <div className="container w-full flex flex-col mb-12 relative">
        <Header />
        <Main>
          <Outlet />
        </Main>
      </div>
      <Footer />
    </>
  );
}
