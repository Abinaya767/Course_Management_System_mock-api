import { useEffect, useState } from "react";
import { getEnrollments, getStudents, getCourses } from "../services/api";
import { getLoggedInUser } from "../utils/storage";

export default function Dashboard() {
    const [students, setStudents] = useState([]);
    const [courses, setCourses] = useState([]);
    const [enrollments, setEnrollments] = useState([]);
    const [error, setError] = useState("");

    useEffect(() => {
        document.title = "Admin Dashboard - LearnSpace";
        Promise.all([getStudents(), getCourses(), getEnrollments()])
            .then(([studentData, courseData, enrollmentData]) => {
                setStudents(studentData);
                setCourses(courseData);
                setEnrollments(enrollmentData);
            })
            .catch((err) => setError(err.message || "Unable to load dashboard data."));
    }, []);

    const admin = getLoggedInUser();

    return (
        <>
            <link rel="stylesheet" href="/styles/dashboardcss.css" />
            <div className="container">
                <aside className="sidebar">
                    <div className="logo"><i className="fa-solid fa-graduation-cap"></i> LearnSpace</div>
                    <ul>
                        <li className="active"><a href="#overview"><i className="fa-solid fa-chart-line"></i> Dashboard</a></li>
                        <li><a href="#students"><i className="fa-solid fa-users"></i> Students</a></li>
                        <li><a href="/course"><i className="fa-solid fa-book"></i> Courses</a></li>
                        <li><a href="#enrollments"><i className="fa-solid fa-user-check"></i> Enrollments</a></li>
                        <li><a href="#"><i className="fa-solid fa-certificate"></i> Certificates</a></li>
                        <li><a href="#"><i className="fa-solid fa-chart-pie"></i> Reports</a></li>
                        <li><a href="#"><i className="fa-solid fa-bell"></i> Notifications</a></li>
                        <li><a href="#"><i className="fa-solid fa-user"></i> Profile</a></li>
                        <li><a href="#"><i className="fa-solid fa-gear"></i> Settings</a></li>
                        <li><a href="/" onClick={() => localStorage.removeItem("loggedInUser")}><i className="fa-solid fa-right-from-bracket"></i> Logout</a></li>
                    </ul>
                </aside>

                <main className="main">
                    <header className="topbar">
                        <div className="page-title"><h2>Admin Dashboard</h2></div>
                        <div className="admin-profile">
                            <i className="fa-solid fa-bell"></i>
                            <div className="profile">
                                <img src="https://i.pravatar.cc/100?img=12" alt="Admin" />
                                <div><h4>{admin?.name || "Administrator"}</h4><p>Admin</p></div>
                            </div>
                        </div>
                    </header>

                    <section className="content" id="overview">
                        <h1>Dashboard Overview</h1>
                        {error && <div className="dashboard-error">{error}</div>}

                        <div className="cards">
                            <div className="card"><div className="icon-box"><i className="fa-solid fa-users"></i></div><h2>{students.length}</h2><p>Total Students</p></div>
                            <div className="card"><div className="icon-box"><i className="fa-solid fa-book-open"></i></div><h2>{courses.length}</h2><p>Total Courses</p></div>
                            <div className="card"><div className="icon-box"><i className="fa-solid fa-user-check"></i></div><h2>{enrollments.length}</h2><p>Total Enrollments</p></div>
                            <div className="card"><div className="icon-box"><i className="fa-solid fa-certificate"></i></div><h2>0</h2><p>Certificates Issued</p></div>
                        </div>

                        <div className="table-box" id="students">
                            <h2>Registered Students</h2>
                            {students.length === 0 ? <p>No students registered yet.</p> : (
                                <div className="table-scroll">
                                    <table>
                                        <thead><tr><th>Student ID</th><th>Name</th><th>Email</th></tr></thead>
                                        <tbody>{students.map((student) => <tr key={student.id}><td>{student.id}</td><td>{student.name}</td><td>{student.email}</td></tr>)}</tbody>
                                    </table>
                                </div>
                            )}
                        </div>

                        <div className="table-box" id="enrollments">
                            <h2>Recent Course Registrations</h2>
                            {enrollments.length === 0 ? <p>No course registrations yet.</p> : (
                                <div className="table-scroll">
                                    <table>
                                        <thead><tr><th>Student</th><th>Course</th><th>Status</th><th>Date</th></tr></thead>
                                        <tbody>{enrollments.slice().reverse().map((item) => <tr key={item.id}><td>{item.studentName}</td><td>{item.courseName}</td><td><span className="enrolled">{item.status}</span></td><td>{item.date}</td></tr>)}</tbody>
                                    </table>
                                </div>
                            )}
                        </div>

                        <div className="actions">
                            <div className="action-card"><i className="fa-solid fa-user-plus"></i><h3>Students</h3><p>View registered student details</p><a href="#students">View</a></div>
                            <div className="action-card"><i className="fa-solid fa-book-medical"></i><h3>Courses</h3><p>View available courses</p><a href="/course">View</a></div>
                            <div className="action-card"><i className="fa-solid fa-user-check"></i><h3>Enrollments</h3><p>View course registrations</p><a href="#enrollments">View</a></div>
                        </div>
                    </section>

                    <footer><p>© 2026 LearnSpace | Admin Dashboard</p></footer>
                </main>
            </div>
        </>
    );
}
