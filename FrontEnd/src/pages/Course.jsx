import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCourses } from "../services/api";

export default function Course() {
    const navigate = useNavigate();
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        document.title = "LearnSpace | Courses";

        getCourses()
            .then(setCourses)
            .catch((err) => setError(err.message || "Unable to load courses."))
            .finally(() => setLoading(false));
    }, []);

    const iconMap = {
        Python: "fa-brands fa-python",
        "Artificial Intelligence": "fa-solid fa-robot",
        "Data Science": "fa-solid fa-chart-line",
        "Cyber Security": "fa-solid fa-shield-halved",
        "Web Development": "fa-solid fa-code",
        "Cloud Computing": "fa-solid fa-cloud",
        "Database Management": "fa-solid fa-database",
        "Generative AI": "fa-solid fa-wand-magic-sparkles"
    };

    return (
        <>
            <link rel="stylesheet" href="/styles/coursecss.css" />

            <nav className="navbar">
                <div className="logo">
                    <i className="fa-solid fa-graduation-cap"></i>
                    LearnSpace
                </div>
                <div className="nav-links">
                    <a href="/" onClick={(e) => { e.preventDefault(); navigate("/"); }}>Home</a>
                    <a href="#courses">Courses</a>
                    <a href="#categories">Categories</a>
                    <a href="#about">About</a>
                    <a href="#contact">Contact</a>
                    <a className="login-btn" href="/login" onClick={(e) => { e.preventDefault(); navigate("/login"); }}>Login</a>
                </div>
            </nav>

            <section className="hero">
                <div className="hero-content">
                    <h1>Learn. <span>Build.</span> Grow.</h1>
                    <p>Discover industry-ready courses designed by experts. Build practical skills, earn certificates and accelerate your career with LearnSpace.</p>
                    <div className="hero-buttons">
                        <a className="primary-btn" href="#courses">Explore Courses</a>
                        <a className="secondary-btn" href="#categories">Browse Categories</a>
                    </div>
                </div>
            </section>

            <section className="section" id="categories">
                <div className="section-title">
                    <h2>Course Categories</h2>
                    <p>Select your favorite learning path.</p>
                </div>
                <div className="category-container">
                    {[
                        ["Python", "Programming & Automation"],
                        ["Artificial Intelligence", "Machine Learning & Generative AI"],
                        ["Data Science", "Analytics & Visualization"],
                        ["Cyber Security", "Ethical Hacking & Security"],
                        ["Web Development", "Frontend & Backend Development"],
                        ["Cloud Computing", "Cloud Platforms & DevOps"]
                    ].map(([name, description]) => (
                        <div className="category-card" key={name}>
                            <i className={iconMap[name] || "fa-solid fa-book"}></i>
                            <h3>{name}</h3>
                            <p>{description}</p>
                        </div>
                    ))}
                </div>
            </section>

            <section className="section" id="courses">
                <div className="section-title">
                    <h2>Popular Courses</h2>
                    <p>Choose a course and register to start your learning journey.</p>
                </div>

                {loading && <p style={{ textAlign: "center" }}>Loading courses...</p>}
                {error && <p style={{ textAlign: "center", color: "#c62828" }}>{error}</p>}

                {!loading && !error && (
                    <div className="course-container">
                        {courses.map((course) => (
                            <div className="course-card" key={course.id}>
                                <div className="course-header">
                                    <h3>{course.title}</h3>
                                    <span className={`level ${course.levelClass || "beginner"}`}>{course.level}</span>
                                </div>
                                <p>{course.description}</p>
                                <div className="course-details">
                                    <span><i className="fa-regular fa-clock"></i> {course.duration}</span>
                                    <span><i className="fa-solid fa-star"></i> {course.rating}</span>
                                </div>
                                <div className="course-details">
                                    <span>Certificate</span>
                                    <span>{course.students || 0} Students</span>
                                </div>
                                <button
                                    className="enroll-btn"
                                    onClick={() => navigate(`/enroll/${course.id}`)}
                                >
                                    Register Now
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </section>

            <section className="section" id="about">
                <div className="section-title">
                    <h2>About LearnSpace</h2>
                    <p>LearnSpace is an online learning platform designed to help students develop industry-ready skills through structured courses and practical learning experiences.</p>
                </div>
                <div className="about-container">
                    <div className="about-card"><i className="fa-solid fa-book-open"></i><h3>Quality Learning</h3><p>Expert-designed courses with easy-to-understand content and hands-on activities.</p></div>
                    <div className="about-card"><i className="fa-solid fa-certificate"></i><h3>Certification</h3><p>Earn course completion certificates to showcase your skills and achievements.</p></div>
                    <div className="about-card"><i className="fa-solid fa-laptop-code"></i><h3>Practical Projects</h3><p>Apply your knowledge by building real-world projects and strengthening your portfolio.</p></div>
                </div>
            </section>

            <section className="section" id="contact">
                <div className="section-title"><h2>Contact Us</h2><p>We'd love to hear from you.</p></div>
                <div className="contact-container">
                    <div className="contact-card"><i className="fa-solid fa-envelope"></i><h3>Email</h3><p>support@learnspace.com</p></div>
                    <div className="contact-card"><i className="fa-solid fa-phone"></i><h3>Phone</h3><p>+91 9876543210</p></div>
                    <div className="contact-card"><i className="fa-solid fa-location-dot"></i><h3>Location</h3><p>Chennai, Tamil Nadu, India</p></div>
                </div>
            </section>

            <footer>
                <div className="footer-content">
                    <div><h2>LearnSpace</h2><p>Empowering learners through quality education, practical projects and career-focused courses.</p></div>
                    <div><h3>Quick Links</h3><p>Home</p><p>Courses</p><p>Categories</p><p>Contact</p></div>
                    <div><h3>Follow Us</h3><p>Facebook</p><p>Instagram</p><p>LinkedIn</p></div>
                </div>
                <div className="copyright">© 2026 LearnSpace. All Rights Reserved.</div>
            </footer>
        </>
    );
}
