import { Route, Routes } from "react-router-dom";
import Dashboard from "./Dashboard";
import "./index.css";
import Navbar from "./components/Navbar";

function App() {
  return (
    <>
      <main className="flex h-screen bg-gray-100">
        <Navbar />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          {/* <Route path="/login" element={<Login />} /> */}
          {/* <Route path="/register" element={<Register />} /> */}
          {/* <Route path="/tasks" element={<Tasks />} /> */}
          {/* <Route path="/add-task" element={<AddTask />} /> */}
          {/* <Route path="/focus-clock" element={<FocusClock />} /> */}
          {/* <Route path="/profile" element={<Profile />} /> */}
          {/* <Route path="/edit-profile" element={<EditProfile />} /> */}
          {/* <Route path="/notifications" element={<Notifications />} /> */}
          {/* <Route path="/achievements" element={<Achievements />} /> */}
        </Routes>
      </main>
    </>
  );
}

export default App;
