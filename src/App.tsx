import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Layout from "./layout";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Jobs from "./pages/Jobs";
import NotFound from "./pages/NotFound";
import "./i18n";
import { Toaster } from "./components/ui/toaster";
import PrivateRoute from "./PrivateRoute";

function App() {
  return (
    <>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route element={<PrivateRoute />}>
            <Route path="/jobs" element={<Jobs />} />
          </Route>
        </Route>
        <Route path="/404" element={<NotFound />} />
        <Route path="*" element={<Navigate to="/404" replace />} />
      </Routes>
      <Toaster />
    </>
  );
}

export default App;
