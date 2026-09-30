import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { addEnrollment, getCourses, getStudents } from "../services/api";
import { getLoggedInUser } from "../utils/storage";

export default function Enrollment() {
    const { courseId } = useParams();
    const navigate = useNavigate();
    const [course, setCourse] = useState(null);
    const [form, setForm] = useState({ studentId: "", name: "", email: "", phone: "" });
    const [success, setSuccess] = useState(null);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        document.title = "LearnSpace | Course Registration";
        const loggedInUser = getLoggedInUser();
        if (loggedInUser) {
            setForm((current) => ({
                ...current,
                studentId: loggedInUser.id || "",
                name: loggedInUser.name || "",
                email: loggedInUser.email || ""
            }));
        }

        Promise.all([getCourses(), getStudents()])
            .then(([courses]) => {
                const selected = courses.find((item) => String(item.id) === String(courseId));
                if (!selected) setError("Course not found.");
                setCourse(selected || null);
            })
            .catch(() => setError("Unable to load course. Please make sure MockAPI is running."))
            .finally(() => setLoading(false));
    }, [courseId]);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        if (!form.studentId || !form.name || !form.email || !form.phone) {
            setError("Please fill in all the details.");
            return;
        }

        try {
            const students = await getStudents();
            const registeredStudent = students.find((student) => student.id === form.studentId);
            if (!registeredStudent) {
                setError("Student ID not found. Please register as a student first.");
                return;
            }

            const enrollment = await addEnrollment({
                studentId: form.studentId,
                studentName: form.name,
                studentEmail: form.email,
                phone: form.phone,
                courseId: course.id,
                courseName: course.title,
                status: "Enrolled",
                date: new Date().toLocaleDateString("en-GB")
            });

            setSuccess(enrollment);
        } catch (err) {
            setError(err.message || "Unable to complete registration.");
        }
    };

    if (loading) return <div className="enrollment-page"><p>Loading...</p></div>;

    return (
        <>
            <link rel="stylesheet" href="/styles/enrollmentcss.css" />
            <div className="enrollment-page">
                <div className="enrollment-card">
                    {!success ? (
                        <>
                            <div className="enrollment-header">
                                <i className="fa-solid fa-graduation-cap"></i>
                                <h1>Course Registration</h1>
                                <p>{course?.title}</p>
                            </div>

                            {error && <div className="form-error">{error}</div>}

                            <form onSubmit={handleSubmit}>
                                <label>Student ID</label>
                                <input name="studentId" value={form.studentId} onChange={handleChange} placeholder="Enter Student ID" />

                                <label>Full Name</label>
                                <input name="name" value={form.name} onChange={handleChange} placeholder="Enter your full name" />

                                <label>Email Address</label>
                                <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="Enter your email" />

                                <label>Phone Number</label>
                                <input name="phone" value={form.phone} onChange={handleChange} placeholder="Enter your phone number" />

                                <button type="submit">Register for Course</button>
                            </form>

                            <button className="back-link" onClick={() => navigate("/course")}>Back to Courses</button>
                        </>
                    ) : (
                        <div className="success-box">
                            <div className="success-icon">✓</div>
                            <h1>Registration Successful!</h1>
                            <p>You have successfully registered for:</p>
                            <h2>{course.title}</h2>
                            <div className="registration-details">
                                <p><strong>Student ID:</strong> {success.studentId}</p>
                                <p><strong>Name:</strong> {success.studentName}</p>
                                <p><strong>Email:</strong> {success.studentEmail}</p>
                                <p><strong>Status:</strong> {success.status}</p>
                            </div>
                            <button onClick={() => navigate("/course")}>Back to Courses</button>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}
