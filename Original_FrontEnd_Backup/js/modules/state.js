// ================= APPLICATION STATE MODULE =================

let appState = {

    currentUser: null,

    userType: null,

    isLoggedIn: false

};


// ================= SET CURRENT USER =================

export function setCurrentUser(user) {

    appState.currentUser = user;

    appState.isLoggedIn = user !== null;

}


// ================= GET CURRENT USER =================

export function getCurrentUser() {

    return appState.currentUser;

}


// ================= SET USER TYPE =================

export function setUserType(type) {

    appState.userType = type;

}


// ================= GET USER TYPE =================

export function getUserType() {

    return appState.userType;

}


// ================= CHECK LOGIN =================

export function isUserLoggedIn() {

    return appState.isLoggedIn;

}


// ================= CLEAR STATE =================

export function clearState() {

    appState.currentUser = null;

    appState.userType = null;

    appState.isLoggedIn = false;

}