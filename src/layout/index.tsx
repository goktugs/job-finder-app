import Header from "./Header";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import Main from "./Main";

export default function Layout() {
  return (
    <>
      <Header />
      <Main>
        <Outlet />
      </Main>
      <Footer />
    </>
  );
}
