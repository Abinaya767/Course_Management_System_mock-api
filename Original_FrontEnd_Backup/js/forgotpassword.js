// ================= FORGOT PASSWORD MODULE =================

import {
    getStudents,
    getAdmins,
    saveStudents,
    saveAdmins
} from "./modules/storage.js";


// ================= FORM ELEMENT =================

const form = document.getElementById("forgotForm");


// ================= RESET PASSWORD =================

form.addEventListener("submit", function (e) {

    e.preventDefault();


    const accountType =
        document.getElementById("accountType").value;


    const userId =
        document.getElementById("userId").value.trim();


    const newPassword =
        document.getElementById("newPassword").value;


    const confirmPassword =
        document.getElementById("confirmPassword").value;


    // ================= ACCOUNT TYPE VALIDATION =================

    if (accountType === "") {

        alert("Please select account type.");
        return;

    }


    // ================= ID VALIDATION =================

    if (userId === "") {

        alert("Please enter your registered ID.");
        return;

    }


    // ================= PASSWORD VALIDATION =================

    if (newPassword.length < 6) {

        alert("Password must contain minimum 6 characters.");
        return;

    }


    if (newPassword !== confirmPassword) {

        alert("Passwords do not match.");
        return;

    }


    // ================= STUDENT PASSWORD RESET =================

    if (accountType === "student") {

        const students = getStudents();


        const student = students.find(function (user) {

            return user.id === userId;

        });


        if (student) {

            student.password = newPassword;


            saveStudents(students);


            alert(
                "Password reset successful!\n\n" +
                "You can login with your new password."
            );


            window.location.href = "login.html";

        }

        else {

            alert(
                "Student ID not found. Please register first."
            );

        }

    }


    // ================= ADMIN PASSWORD RESET =================

    if (accountType === "admin") {

        const admins = getAdmins();


        const admin = admins.find(function (user) {

            return user.id === userId;

        });


        if (admin) {

            admin.password = newPassword;


            saveAdmins(admins);


            alert(
                "Admin password reset successful!\n\n" +
                "You can login with your new password."
            );


            window.location.href = "login.html";

        }

        else {

            alert(
                "Admin ID not found. Please register first."
            );

        }

    }

});