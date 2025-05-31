import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import "./index.css";
import NavbarMobile from "./components/Navbar";
import Home from "./pages/Home";
import { type ReactNode, useEffect, useState } from "react";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Tasks from "./pages/Tasks";
import Profile from "./pages/Profile";
import Notifications from "./pages/Notifications";
import AddTask from "./pages/AddTask";
import Cronometer from "./pages/Focus";
import Achievments from "./pages/Achievments";
import Overview from "./pages/Overview";
import EditProfile from "./pages/EditProfile";
import NavBarDesktop from "./components/NavBarDesktop";
import background from "./assets/background.png";
import backgroundDark from "./assets/background-dark.png";
import { DataProvider } from "./contexts/DataContext";
import TaskDetails from "./pages/TaskDetails";

const PrivateRoute = () => {
  const token = localStorage.getItem("token");
  return token ? <Outlet /> : <Navigate to="/login" replace />;
};

const LayoutWithNavbar = ({ children }: { children: ReactNode }) => (
  <DataProvider>
    <NavbarMobile />
    <NavBarDesktop />
    <div className="flex-1 px-6 sm:mt-16 w-full max-w-[100vw] overflow-x-hidden">
      <div className="w-full">{children}</div>
    </div>
  </DataProvider>
);

const LayoutWithoutNavbar = ({ children }: { children: ReactNode }) => (
  <>{children}</>
);

function App() {
  const [darkMode, setDarkMode] = useState(() => {
    const savedMode = localStorage.getItem("darkMode");
    return savedMode ? JSON.parse(savedMode) : false;
  });
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
  }, [darkMode]);
  return (
    <main
      className="h-screen w-full flex justify-center overflow-x-hidden dark:text-white"
      style={{
        backgroundImage: `url(${darkMode ? backgroundDark : background})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
        backgroundRepeat: "no-repeat",
      }}
    >
      <Routes>
        <Route
          element={
            <LayoutWithoutNavbar>
              <Outlet />
            </LayoutWithoutNavbar>
          }
        >
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/cadastro" element={<SignUp />} />
        </Route>

        <Route element={<PrivateRoute />}>
          <Route
            element={
              <LayoutWithNavbar>
                <Outlet />
              </LayoutWithNavbar>
            }
          >
            <Route path="/dash" element={<Dashboard />} />
            <Route path="/tarefas" element={<Tasks />} />
            <Route path="/tarefa/:id" element={<TaskDetails />} />
            <Route
              path="/perfil"
              element={
                <Profile darkMode={darkMode} setDarkMode={setDarkMode} />
              }
            />
            <Route path="/editar-perfil" element={<EditProfile />} />
            <Route path="/notificacoes" element={<Notifications />} />
            <Route path="/add-tarefas" element={<AddTask />} />
            <Route path="/foco" element={<Cronometer />} />
            <Route path="/resumo" element={<Overview />} />
            <Route path="/conquistas" element={<Achievments />} />
          </Route>
        </Route>

        <Route
          path="*"
          element={
            <LayoutWithoutNavbar>
              <NotFound />
            </LayoutWithoutNavbar>
          }
        />
      </Routes>
    </main>
  );
}

export default App;
