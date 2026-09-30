import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { templates } from "../templates";
import {
  loginStudent,
  loginAdmin,
  registerStudent,
  registerAdmin
} from "../utils/auth";
import { setCurrentUser, setUserType } from "../utils/state";
import {
  getStudents,
  getAdmins,
  updateStudent,
  updateAdmin
} from "../services/api";

const routeMap = {
  "home.html": "/",
  "login.html": "/login",
  "register.html": "/register",
  "forgotpassword.html": "/forgotpassword",
  "adminregister.html": "/adminregister",
  "course.html": "/course",
  "dashboard.html": "/dashboard"
};

export default function LegacyPage({ page, css, title }) {
  const ref = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    document.title = title;
  }, [title]);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;

    const handleClick = (e) => {
      const link = e.target.closest("a");
      if (!link || !root.contains(link)) return;

      const href = link.getAttribute("href");
      if (!href || href === "#") {
        e.preventDefault();
        return;
      }

      if (routeMap[href]) {
        e.preventDefault();
        navigate(routeMap[href]);
      }
    };

    root.addEventListener("click", handleClick);
    return () => root.removeEventListener("click", handleClick);
  }, [navigate]);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;

    const studentForm = root.querySelector("#studentLoginForm");
    const adminForm = root.querySelector("#adminLoginForm");
    const registerForm = root.querySelector("#registerForm");
    const forgotForm = root.querySelector("#forgotForm");
    const adminRegisterForm = root.querySelector("#adminRegisterForm");
    const agree = root.querySelector("#agree");
    const registerBtn = root.querySelector("#registerBtn");

    const onStudentLogin = async (e) => {
      e.preventDefault();

      const studentId =
        root.querySelector("#studentId")?.value.trim() || "";
      const studentPassword =
        root.querySelector("#studentPassword")?.value || "";

      try {
        const student = await loginStudent(studentId, studentPassword);

        if (student) {
          setCurrentUser(student);
          setUserType("student");
          alert("Student login successful!");
          navigate("/course");
        } else {
          alert("Invalid Student ID or Password.");
        }
      } catch (error) {
        console.error(error);
        alert("Unable to connect to MockAPI. Please make sure the MockAPI server is running.");
      }
    };

    const onAdminLogin = async (e) => {
      e.preventDefault();

      const adminId =
        root.querySelector("#adminId")?.value.trim() || "";
      const adminPassword =
        root.querySelector("#adminPassword")?.value || "";

      try {
        const admin = await loginAdmin(adminId, adminPassword);

        if (admin) {
          setCurrentUser(admin);
          setUserType("admin");
          alert("Admin login successful!");
          navigate("/dashboard");
        } else {
          alert("Invalid Admin ID or Password.");
        }
      } catch (error) {
        console.error(error);
        alert("Unable to connect to MockAPI. Please make sure the MockAPI server is running.");
      }
    };

    const onRegisterChange = () => {
      if (registerBtn && agree) {
        registerBtn.disabled = !agree.checked;
      }
    };

    const onRegister = async (e) => {
      e.preventDefault();

      const name = root.querySelector("#name")?.value.trim() || "";
      const email = root.querySelector("#email")?.value.trim() || "";
      const password = root.querySelector("#password")?.value || "";
      const confirmPassword =
        root.querySelector("#confirmPassword")?.value || "";

      if (name === "") return alert("Please enter your full name.");
      if (name.length < 3) {
        return alert("Name must contain at least 3 characters.");
      }

      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(email)) {
        return alert("Please enter a valid email address.");
      }

      if (password === "") return alert("Please enter a password.");
      if (password.length < 6) {
        return alert("Password must be at least 6 characters.");
      }

      if (confirmPassword === "") {
        return alert("Please confirm your password.");
      }

      if (password !== confirmPassword) {
        return alert("Passwords do not match.");
      }

      if (!agree?.checked) {
        return alert("Please accept the Terms & Conditions.");
      }

      try {
        const result = await registerStudent(name, email, password);

        if (!result.success) {
          return alert(result.message);
        }

        setCurrentUser(result.student);
        setUserType("student");

        alert(
          "🎉 Registration Successful!\n\n" +
          "Student ID : " + result.student.id +
          "\n\nPlease save this ID.\n\n" +
          "Use this Student ID and Password to login."
        );

        registerForm.reset();
        if (registerBtn) registerBtn.disabled = true;
        navigate("/login");
      } catch (error) {
        console.error(error);
        alert("Unable to register. Please make sure the MockAPI server is running.");
      }
    };

    const onForgot = async (e) => {
      e.preventDefault();

      const accountType =
        root.querySelector("#accountType")?.value || "";
      const userId =
        root.querySelector("#userId")?.value.trim() || "";
      const newPassword =
        root.querySelector("#newPassword")?.value || "";
      const confirmPassword =
        root.querySelector("#confirmPassword")?.value || "";

      if (accountType === "") {
        return alert("Please select account type.");
      }

      if (userId === "") {
        return alert("Please enter your registered ID.");
      }

      if (newPassword.length < 6) {
        return alert("Password must contain minimum 6 characters.");
      }

      if (newPassword !== confirmPassword) {
        return alert("Passwords do not match.");
      }

      try {
        if (accountType === "student") {
          const students = await getStudents();
          const student = students.find((user) => user.id === userId);

          if (student) {
            await updateStudent(userId, {
              ...student,
              password: newPassword
            });

            alert(
              "Password reset successful!\n\n" +
              "You can login with your new password."
            );
            navigate("/login");
          } else {
            alert("Student ID not found. Please register first.");
          }
        }

        if (accountType === "admin") {
          const admins = await getAdmins();
          const admin = admins.find((user) => user.id === userId);

          if (admin) {
            await updateAdmin(userId, {
              ...admin,
              password: newPassword
            });

            alert(
              "Password reset successful!\n\n" +
              "You can login with your new password."
            );
            navigate("/login");
          } else {
            alert("Admin ID not found. Please register first.");
          }
        }
      } catch (error) {
        console.error(error);
        alert("Unable to reset password. Please make sure the MockAPI server is running.");
      }
    };

    const onAdminRegister = async (e) => {
      e.preventDefault();

      const name = root.querySelector("#name")?.value.trim() || "";
      const email = root.querySelector("#email")?.value.trim() || "";
      const password = root.querySelector("#password")?.value || "";
      const confirmPassword =
        root.querySelector("#confirmPassword")?.value || "";

      if (name === "") return alert("Please enter Admin Name.");
      if (name.length < 3) {
        return alert("Admin Name must contain minimum 3 characters.");
      }

      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(email)) {
        return alert("Please enter valid email address.");
      }

      if (password === "") return alert("Please enter password.");
      if (password.length < 6) {
        return alert("Password must contain minimum 6 characters.");
      }

      if (password !== confirmPassword) {
        return alert("Passwords do not match.");
      }

      if (!agree?.checked) {
        return alert("Please accept Terms & Conditions.");
      }

      try {
        const result = await registerAdmin(name, email, password);

        if (!result.success) {
          return alert(result.message);
        }

        alert(
          "🎉 Admin Registration Successful!\n\n" +
          "Admin ID : " + result.admin.id +
          "\n\nPlease save this ID.\n\n" +
          "Use this Admin ID and Password to login."
        );

        navigate("/login");
      } catch (error) {
        console.error(error);
        alert("Unable to register admin. Please make sure the MockAPI server is running.");
      }
    };

    if (studentForm) {
      studentForm.addEventListener("submit", onStudentLogin);
    }

    if (adminForm) {
      adminForm.addEventListener("submit", onAdminLogin);
    }

    if (agree && registerBtn) {
      agree.addEventListener("change", onRegisterChange);
    }

    if (registerForm) {
      registerForm.addEventListener("submit", onRegister);
    }

    if (forgotForm) {
      forgotForm.addEventListener("submit", onForgot);
    }

    if (adminRegisterForm) {
      adminRegisterForm.addEventListener("submit", onAdminRegister);
    }

    return () => {
      if (studentForm) {
        studentForm.removeEventListener("submit", onStudentLogin);
      }

      if (adminForm) {
        adminForm.removeEventListener("submit", onAdminLogin);
      }

      if (agree && registerBtn) {
        agree.removeEventListener("change", onRegisterChange);
      }

      if (registerForm) {
        registerForm.removeEventListener("submit", onRegister);
      }

      if (forgotForm) {
        forgotForm.removeEventListener("submit", onForgot);
      }

      if (adminRegisterForm) {
        adminRegisterForm.removeEventListener("submit", onAdminRegister);
      }
    };
  }, [navigate]);

  return (
    <>
      <link rel="stylesheet" href={css} />
      <div
        ref={ref}
        dangerouslySetInnerHTML={{ __html: templates[page] }}
      />
    </>
  );
}
