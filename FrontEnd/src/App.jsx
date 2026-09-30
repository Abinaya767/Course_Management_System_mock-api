import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import AdminRegister from "./pages/AdminRegister";
import Course from "./pages/Course";
import Enrollment from "./pages/Enrollment";
import Dashboard from "./pages/Dashboard";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/home" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgotpassword" element={<ForgotPassword />} />
      <Route path="/adminregister" element={<AdminRegister />} />
      <Route path="/course" element={<Course />} />
      <Route path="/enroll/:courseId" element={<Enrollment />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
