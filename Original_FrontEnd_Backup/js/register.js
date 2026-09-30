// ================= REGISTER MODULE =================

import {
    registerStudent
} from "./modules/auth.js";

import {
    setCurrentUser,
    setUserType
} from "./modules/state.js";


// ================= ELEMENTS =================

const form = document.getElementById("registerForm");
const message = document.getElementById("message");
const checkbox = document.getElementById("agree");
const registerBtn = document.getElementById("registerBtn");


// ================= ENABLE BUTTON =================

checkbox.addEventListener("change", function () {

    registerBtn.disabled = !this.checked;

});


// ================= REGISTER =================

form.addEventListener("submit", function (e) {

    e.preventDefault();


    const name =
        document.getElementById("name").value.trim();

    const email =
        document.getElementById("email").value.trim();

    const password =
        document.getElementById("password").value;

    const confirmPassword =
        document.getElementById("confirmPassword").value;


    // ================= NAME VALIDATION =================

    if (name === "") {

        alert("Please enter your full name.");
        return;

    }


    if (name.length < 3) {

        alert("Name must contain at least 3 characters.");
        return;

    }


    // ================= EMAIL VALIDATION =================

    const emailPattern =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


    if (!emailPattern.test(email)) {

        alert("Please enter a valid email address.");
        return;

    }


    // ================= PASSWORD VALIDATION =================

    if (password === "") {

        alert("Please enter a password.");
        return;

    }


    if (password.length < 6) {

        alert("Password must be at least 6 characters.");
        return;

    }


    if (confirmPassword === "") {

        alert("Please confirm your password.");
        return;

    }


    if (password !== confirmPassword) {

        alert("Passwords do not match.");
        return;

    }


    // ================= TERMS VALIDATION =================

    if (!checkbox.checked) {

        alert("Please accept the Terms & Conditions.");
        return;

    }


    // ================= REGISTER STUDENT =================

    const result =
        registerStudent(name, email, password);


    // ================= EMAIL EXISTS =================

    if (!result.success) {

        alert(result.message);
        return;

    }


    // ================= UPDATE APPLICATION STATE =================

    setCurrentUser(result.student);
    setUserType("student");


    // ================= SUCCESS =================

    alert(
        "🎉 Registration Successful!\n\n" +
        "Student ID : " + result.student.id +
        "\n\nPlease save this ID.\n\n" +
        "Use this Student ID and Password to login."
    );


    // ================= RESET FORM =================

    form.reset();

    registerBtn.disabled = true;


    // ================= REDIRECT =================

    window.location.href = "login.html";

});