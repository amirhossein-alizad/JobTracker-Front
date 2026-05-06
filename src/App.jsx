import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";

function App() {
    const [applications, setApplications] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetch("http://localhost:8080/applications")
            .then((res) => res.json())
            .then((data) => setApplications(data))
            .catch((err) => console.error(err));
    }, []);

    return (
        <div className="page">
            <div className="container">
                <div className="topBar">
                    <div>
                        <h1>Applications</h1>
                        <p className="subtitle">Track your job applications</p>
                    </div>

                    <button className="btn primary" onClick={() => navigate("/create")}>
                        + Add Application
                    </button>
                </div>

                {applications.length === 0 ? (
                    <div className="card">
                        <p className="empty">No applications found.</p>
                    </div>
                ) : (
                    <div className="list">
                        {applications.map((app) => (
                            <div
                                key={app.id}
                                className="listItem"
                                onClick={() => navigate(`/applications/${app.id}`)}
                            >
                                <div className="topBar">
                                    <div>
                                        <h3>Company: {app.company}</h3>
                                        <p className="subtitle">Role: {app.roleTitle}</p>
                                    </div>

                                    <span className="statusBadge">{app.status}</span>
                                </div>

                                <p><strong>Location:</strong> {app.location}</p>

                                <button
                                    className="btn danger"
                                    onClick={async (e) => {
                                        e.stopPropagation();

                                        try {
                                            const res = await fetch(`http://localhost:8080/applications?id=${app.id}`, {
                                                method: "DELETE"
                                            });

                                            if (!res.ok) {
                                                throw new Error("Failed to delete application");
                                            }

                                            setApplications(applications.filter(a => a.id !== app.id));
                                        } catch (err) {
                                            console.error(err);
                                            alert(err.message);
                                        }
                                    }}
                                >
                                    Remove
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default App;