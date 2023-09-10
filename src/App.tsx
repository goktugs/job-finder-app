import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Layout from "./layout";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Jobs from "./pages/Jobs";

function App() {
  return (
    <>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/jobs" element={<Jobs />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
