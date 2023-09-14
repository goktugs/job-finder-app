import Header from "./Header";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import Main from "./Main";

export default function Layout() {
  return (
    <div className="container h-screen flex flex-col">
      <Header />
      <Main>
        <Outlet />
      </Main>
      <Footer />
    </div>
  );
}
