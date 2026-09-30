// ================= AUTH MODULE =================

import {
    getStudents,
    getAdmins,
    saveStudents,
    saveLoggedInUser,
    saveUserType,
    removeLoggedInUser
} from "./storage.js";


// ================= STUDENT LOGIN =================

export function loginStudent(studentId, password) {

    const students = getStudents();

    const student = students.find(function (user) {

        return user.id === studentId &&
               user.password === password;

    });

    if (student) {

        saveLoggedInUser(student);
        saveUserType("student");

        return student;

    }

    return null;

}


// ================= ADMIN LOGIN =================

export function loginAdmin(adminId, password) {

    const admins = getAdmins();

    const admin = admins.find(function (user) {

        return user.id === adminId &&
               user.password === password;

    });

    if (admin) {

        saveLoggedInUser(admin);
        saveUserType("admin");

        return admin;

    }

    return null;

}


// ================= STUDENT REGISTRATION =================

export function registerStudent(name, email, password) {

    const students = getStudents();


    // Check existing email

    const emailExists = students.find(function (student) {

        return student.email === email;

    });


    if (emailExists) {

        return {
            success: false,
            message: "This email is already registered."
        };

    }


    // Generate Student ID

    const studentId =
        "STU" +
        String(students.length + 1).padStart(3, "0");


    // Create student

    const student = {

        id: studentId,
        name: name,
        email: email,
        password: password

    };


    // Add student

    students.push(student);


    // Save students

    saveStudents(students);


    return {

        success: true,
        student: student

    };

}


// ================= LOGOUT =================

export function logout() {

    removeLoggedInUser();

    localStorage.removeItem("userType");

}