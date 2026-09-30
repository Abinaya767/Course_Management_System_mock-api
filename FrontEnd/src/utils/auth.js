// ================= AUTH MODULE =================

import {
    saveLoggedInUser,
    saveUserType,
    removeLoggedInUser
} from "./storage.js";

import {
    getStudents,
    getAdmins,
    addStudent,
    addAdmin
} from "../services/api.js";


// ================= STUDENT LOGIN =================

export async function loginStudent(studentId, password) {
    const students = await getStudents();

    const student = students.find(function (user) {
        return user.id === studentId && user.password === password;
    });

    if (student) {
        saveLoggedInUser(student);
        saveUserType("student");
        return student;
    }

    return null;
}


// ================= ADMIN LOGIN =================

export async function loginAdmin(adminId, password) {
    const admins = await getAdmins();

    const admin = admins.find(function (user) {
        return user.id === adminId && user.password === password;
    });

    if (admin) {
        saveLoggedInUser(admin);
        saveUserType("admin");
        return admin;
    }

    return null;
}


// ================= STUDENT REGISTRATION =================

export async function registerStudent(name, email, password) {
    const students = await getStudents();

    const emailExists = students.find(function (student) {
        return student.email.toLowerCase() === email.toLowerCase();
    });

    if (emailExists) {
        return {
            success: false,
            message: "This email is already registered."
        };
    }

    const studentId =
        "STU" + String(students.length + 1).padStart(3, "0");

    const student = {
        id: studentId,
        name,
        email,
        password
    };

    const savedStudent = await addStudent(student);

    return {
        success: true,
        student: savedStudent
    };
}


// ================= ADMIN REGISTRATION =================

export async function registerAdmin(name, email, password) {
    const admins = await getAdmins();

    const emailExists = admins.find(function (admin) {
        return admin.email.toLowerCase() === email.toLowerCase();
    });

    if (emailExists) {
        return {
            success: false,
            message: "This email is already registered."
        };
    }

    const adminId =
        "ADM" + String(admins.length + 1).padStart(3, "0");

    const admin = {
        id: adminId,
        name,
        email,
        password
    };

    const savedAdmin = await addAdmin(admin);

    return {
        success: true,
        admin: savedAdmin
    };
}


// ================= LOGOUT =================

export function logout() {
    removeLoggedInUser();
    localStorage.removeItem("userType");
}
