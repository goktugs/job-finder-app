import { Outlet, Navigate } from "react-router-dom";

const PrivateRoute = () => {
  const isAuth = localStorage.getItem("accessToken") ? true : false;

  return isAuth ? <Outlet /> : <Navigate to="/" />;
};

export default PrivateRoute;
