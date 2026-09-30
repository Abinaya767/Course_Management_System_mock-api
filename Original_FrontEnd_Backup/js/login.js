// ================= LOGIN MODULE =================

import {
    loginStudent,
    loginAdmin
} from "./modules/auth.js";

import {
    setCurrentUser,
    setUserType
} from "./modules/state.js";


// ================= STUDENT LOGIN =================

const studentLoginForm =
    document.getElementById("studentLoginForm");

studentLoginForm.addEventListener("submit", function (e) {

    e.preventDefault();

    const studentId =
        document.getElementById("studentId").value.trim();

    const studentPassword =
        document.getElementById("studentPassword").value;


    // Authenticate student

    const student =
        loginStudent(studentId, studentPassword);


    if (student) {

        // Update application state

        setCurrentUser(student);
        setUserType("student");


        alert("Student login successful!");


        // Student → Course page

        window.location.href = "course.html";

    }

    else {

        alert("Invalid Student ID or Password.");

    }

});


// ================= ADMIN LOGIN =================

const adminLoginForm =
    document.getElementById("adminLoginForm");

adminLoginForm.addEventListener("submit", function (e) {

    e.preventDefault();

    const adminId =
        document.getElementById("adminId").value.trim();

    const adminPassword =
        document.getElementById("adminPassword").value;


    // Authenticate admin

    const admin =
        loginAdmin(adminId, adminPassword);


    if (admin) {

        // Update application state

        setCurrentUser(admin);
        setUserType("admin");


        alert("Admin login successful!");


        // Admin → Dashboard

        window.location.href = "dashboard.html";

    }

    else {

        alert("Invalid Admin ID or Password.");

    }

});