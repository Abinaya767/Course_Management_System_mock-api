// ================= ADMIN REGISTER MODULE =================

import {
    getAdmins,
    saveAdmins
} from "./modules/storage.js";


// ================= ELEMENTS =================

const form =
    document.getElementById("adminRegisterForm");

const checkbox =
    document.getElementById("agree");

const message =
    document.querySelector(".message");


// ================= ADMIN REGISTER =================

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

        alert("Please enter Admin Name.");
        return;

    }


    if (name.length < 3) {

        alert(
            "Admin Name must contain minimum 3 characters."
        );

        return;

    }


    // ================= EMAIL VALIDATION =================

    const emailPattern =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


    if (!emailPattern.test(email)) {

        alert("Please enter valid email address.");
        return;

    }


    // ================= PASSWORD VALIDATION =================

    if (password === "") {

        alert("Please enter password.");
        return;

    }


    if (password.length < 6) {

        alert(
            "Password must contain minimum 6 characters."
        );

        return;

    }


    // ================= CONFIRM PASSWORD =================

    if (password !== confirmPassword) {

        alert("Passwords do not match.");
        return;

    }


    // ================= TERMS =================

    if (!checkbox.checked) {

        alert("Please accept Terms & Conditions.");
        return;

    }


    // ================= GET EXISTING ADMINS =================

    const admins = getAdmins();


    // ================= CHECK EMAIL =================

    const existingAdmin =
        admins.find(function (admin) {

            return admin.email === email;

        });


    if (existingAdmin) {

        alert("This email is already registered.");
        return;

    }


    // ================= GENERATE ADMIN ID =================

    const adminId =
        "ADM" +
        String(admins.length + 1).padStart(3, "0");


    // ================= CREATE ADMIN =================

    const admin = {

        id: adminId,
        name: name,
        email: email,
        password: password

    };


    // ================= SAVE ADMIN =================

    admins.push(admin);

    saveAdmins(admins);


    // ================= SUCCESS =================

    alert(

        "🎉 Admin Registration Successful!\n\n" +

        "Admin ID : " + adminId +

        "\n\nPlease save this ID.\n\n" +

        "Use this Admin ID and Password to login."

    );


    // ================= REDIRECT =================

    window.location.href = "login.html";

});