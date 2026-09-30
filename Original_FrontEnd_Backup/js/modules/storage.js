// ================= STORAGE MODULE =================


// ================= GET DATA =================

export function getStudents() {

    return JSON.parse(
        localStorage.getItem("students")
    ) || [];

}


export function getAdmins() {

    return JSON.parse(
        localStorage.getItem("admins")
    ) || [];

}


// ================= SAVE DATA =================

export function saveStudents(students) {

    localStorage.setItem(
        "students",
        JSON.stringify(students)
    );

}


export function saveAdmins(admins) {

    localStorage.setItem(
        "admins",
        JSON.stringify(admins)
    );

}


// ================= GET LOGGED-IN USER =================

export function getLoggedInUser() {

    return JSON.parse(
        localStorage.getItem("loggedInUser")
    );

}


// ================= SAVE LOGGED-IN USER =================

export function saveLoggedInUser(user) {

    localStorage.setItem(
        "loggedInUser",
        JSON.stringify(user)
    );

}


// ================= REMOVE LOGGED-IN USER =================

export function removeLoggedInUser() {

    localStorage.removeItem("loggedInUser");

}


// ================= GET USER TYPE =================

export function getUserType() {

    return localStorage.getItem("userType");

}


// ================= SAVE USER TYPE =================

export function saveUserType(type) {

    localStorage.setItem(
        "userType",
        type
    );

}


// ================= CLEAR LOGIN DATA =================

export function clearLoginData() {

    localStorage.removeItem("loggedInUser");
    localStorage.removeItem("userType");

}