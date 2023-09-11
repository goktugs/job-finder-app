import Header from "./Header";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import Main from "./Main";

import { Toaster } from "@/components/ui/toaster";

export default function Layout() {
  return (
    <div className="container h-screen flex flex-col">
      <Header />
      <Main>
        <Outlet />
      </Main>
      <Footer />
      <Toaster />
    </div>
  );
}
