import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginStudent, loginAdmin } from "../utils/auth";
import { setCurrentUser, setUserType } from "../utils/state";

export default function Login() {
  const navigate = useNavigate();
  const [role, setRole] = useState(null);

  const [studentId, setStudentId] = useState("");
  const [studentPassword, setStudentPassword] = useState("");
  const [adminId, setAdminId] = useState("");
  const [adminPassword, setAdminPassword] = useState("");

  useEffect(() => {
    const existingLink = document.querySelector('link[data-login-css="true"]');

    if (!existingLink) {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = "/styles/logincss.css";
      link.dataset.loginCss = "true";
      document.head.appendChild(link);
    }

    return () => {
      const link = document.querySelector('link[data-login-css="true"]');
      if (link) {
        link.remove();
      }
    };
  }, []);

  function handleStudentLogin(e) {
    e.preventDefault();

    const student = loginStudent(studentId.trim(), studentPassword);

    if (student) {
      setCurrentUser(student);
      setUserType("student");
      alert("Student login successful!");
      navigate("/course");
    } else {
      alert("Invalid Student ID or Password.");
    }
  }

  function handleAdminLogin(e) {
    e.preventDefault();

    const admin = loginAdmin(adminId.trim(), adminPassword);

    if (admin) {
      setCurrentUser(admin);
      setUserType("admin");
      alert("Admin login successful!");
      navigate("/dashboard");
    } else {
      alert("Invalid Admin ID or Password.");
    }
  }

  return (
    <div className="login-container">

      {/* LEFT SIDE */}
      <div className="role-panel">

        <div className="logo">
          <i className="fa-solid fa-graduation-cap"></i>
          LearnSpace
        </div>

        <h1>Choose Your Role</h1>

        <p>Select your role to continue</p>

        {/* STUDENT BUTTON */}
        <button
          className={`role-btn ${role === "student" ? "active" : ""}`}
          id="studentBtn"
          type="button"
          onClick={() => setRole("student")}
        >
          <i className="fa-solid fa-user-graduate"></i>

          <div>
            <strong>Student</strong>
            <span>
              Access courses and track your progress
            </span>
          </div>
        </button>

        {/* ADMIN BUTTON */}
        <button
          className={`role-btn ${role === "admin" ? "active" : ""}`}
          id="adminBtn"
          type="button"
          onClick={() => setRole("admin")}
        >
          <i className="fa-solid fa-user-shield"></i>

          <div>
            <strong>Admin</strong>
            <span>
              Manage students and courses
            </span>
          </div>
        </button>

        {/* BACK TO HOME */}
        <Link to="/" className="back-home">
          <i className="fa-solid fa-arrow-left"></i>
          Back to Home
        </Link>
      </div>

      {/* RIGHT SIDE */}
      <div className="login-panel">

        {/* WELCOME */}
        {role === null && (
          <div
            className="welcome-content"
            id="welcomeContent"
          >
            <div className="welcome-icon">
              <i className="fa-solid fa-graduation-cap"></i>
            </div>

            <h1>Welcome to LearnSpace</h1>

            <p>
              Please select Student or Admin from the left side
              to continue.
            </p>
          </div>
        )}

        {/* STUDENT LOGIN */}
        {role === "student" && (
          <div
            className="login-form"
            id="studentLogin"
            style={{ display: "block" }}
          >
            <div className="form-icon">
              <i className="fa-solid fa-user-graduate"></i>
            </div>

            <h1>Student Login</h1>

            <p>
              Login to access your courses and learning progress.
            </p>

            <form
              id="studentLoginForm"
              autoComplete="off"
              onSubmit={handleStudentLogin}
            >
              <div className="input-group">
                <i className="fa-solid fa-id-card"></i>

                <input
                  type="text"
                  id="studentId"
                  name="studentId"
                  placeholder="Student ID"
                  autoComplete="off"
                  value={studentId}
                  required
                  onChange={(e) => setStudentId(e.target.value)}
                />
              </div>

              <div className="input-group">
                <i className="fa-solid fa-lock"></i>

                <input
                  type="password"
                  id="studentPassword"
                  name="studentPassword"
                  placeholder="Password"
                  autoComplete="new-password"
                  value={studentPassword}
                  required
                  onChange={(e) => setStudentPassword(e.target.value)}
                />
              </div>

              <button
                type="submit"
                className="main-btn"
              >
                Login
                <i className="fa-solid fa-arrow-right"></i>
              </button>
            </form>

            <Link
              to="/forgotpassword"
              className="forgot-link"
            >
              Forgot Password?
            </Link>

            <p className="register-text">
              Don't have an account?
              <Link to="/register">
                Register
              </Link>
            </p>
          </div>
        )}

        {/* ADMIN LOGIN */}
        {role === "admin" && (
          <div
            className="login-form"
            id="adminLogin"
            style={{ display: "block" }}
          >
            <div className="form-icon admin-icon">
              <i className="fa-solid fa-user-shield"></i>
            </div>

            <h1>Admin Login</h1>

            <p>
              Login to manage students, courses and academic activities.
            </p>

            <form
              id="adminLoginForm"
              autoComplete="off"
              onSubmit={handleAdminLogin}
            >
              <div className="input-group">
                <i className="fa-solid fa-id-card"></i>

                <input
                  type="text"
                  id="adminId"
                  name="adminId"
                  placeholder="Admin ID"
                  autoComplete="off"
                  value={adminId}
                  required
                  onChange={(e) => setAdminId(e.target.value)}
                />
              </div>

              <div className="input-group">
                <i className="fa-solid fa-lock"></i>

                <input
                  type="password"
                  id="adminPassword"
                  name="adminPassword"
                  placeholder="Password"
                  autoComplete="new-password"
                  value={adminPassword}
                  required
                  onChange={(e) => setAdminPassword(e.target.value)}
                />
              </div>

              <button
                type="submit"
                className="main-btn"
              >
                Login
                <i className="fa-solid fa-arrow-right"></i>
              </button>
            </form>

            <Link
              to="/forgotpassword"
              className="forgot-link"
            >
              Forgot Password?
            </Link>

            <p className="register-text">
              Don't have an account?
              <Link to="/adminregister">
                Register
              </Link>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
