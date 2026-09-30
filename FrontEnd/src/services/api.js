const API_URL = "http://localhost:3000";

async function request(endpoint, options = {}) {
    const response = await fetch(`${API_URL}${endpoint}`, {
        headers: {
            "Content-Type": "application/json",
            ...(options.headers || {})
        },
        ...options
    });

    if (!response.ok) {
        let message = `Request failed: ${response.status}`;
        try {
            const errorData = await response.json();
            if (errorData?.message) message = errorData.message;
        } catch {
            // Keep the default message.
        }
        throw new Error(message);
    }

    return response.status === 204 ? null : response.json();
}

// Students
export const getStudents = () => request("/students");
export const addStudent = (student) =>
    request("/students", { method: "POST", body: JSON.stringify(student) });
export const updateStudent = (id, updatedData) =>
    request(`/students/${encodeURIComponent(id)}`, {
        method: "PUT",
        body: JSON.stringify(updatedData)
    });

// Admins
export const getAdmins = () => request("/admins");
export const addAdmin = (admin) =>
    request("/admins", { method: "POST", body: JSON.stringify(admin) });
export const updateAdmin = (id, updatedData) =>
    request(`/admins/${encodeURIComponent(id)}`, {
        method: "PUT",
        body: JSON.stringify(updatedData)
    });

// Courses
export const getCourses = () => request("/courses");
export const addCourse = (course) =>
    request("/courses", { method: "POST", body: JSON.stringify(course) });
export const updateCourse = (id, updatedData) =>
    request(`/courses/${encodeURIComponent(id)}`, {
        method: "PUT",
        body: JSON.stringify(updatedData)
    });
export const deleteCourse = (id) =>
    request(`/courses/${encodeURIComponent(id)}`, { method: "DELETE" });

// Enrollments
export const getEnrollments = () => request("/enrollments");
export const addEnrollment = (enrollment) =>
    request("/enrollments", {
        method: "POST",
        body: JSON.stringify(enrollment)
    });
