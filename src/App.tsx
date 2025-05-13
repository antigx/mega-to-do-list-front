import { Outlet, Route, Routes } from "react-router-dom";
import Dashboard from "./Dashboard";
import "./index.css";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import type { ReactNode } from "react";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Cadastro from "./pages/Cadastro";
// Layout with Navbar
const LayoutWithNavbar = ({ children }:{children: ReactNode}) => (
  <>
    <Navbar />
    {children}
  </>
);

// Layout without Navbar (plain)
const LayoutWithoutNavbar = ({ children }:{children: ReactNode}) => <>{children}</>;
function App() {
  return (
    <>
      <main className="flex h-screen bg-gray-100">

      <Routes>
  {/* Routes WITHOUT Navbar */}
  <Route element={<LayoutWithoutNavbar><Outlet /></LayoutWithoutNavbar>}>
    <Route path="/" element={<Home />} />
    <Route path="/login" element={<Login />} />
    /*<Route path="/cadastro" element={<Cadastro />} /> */
  </Route>

  {/* Routes WITH Navbar */}
  <Route element={<LayoutWithNavbar ><Outlet /></LayoutWithNavbar>}>
    <Route path="/dash" element={<Dashboard />} />
{/*     <Route path="/profile" element={<Profile />} />
    <Route path="/settings" element={<Settings />} /> */}
  </Route>

  {/* 404 Page (No Navbar) */}
  <Route path="*" element={<LayoutWithoutNavbar><NotFound /></LayoutWithoutNavbar>} />
</Routes>
      </main>
    </>
  );
}

export default App;
