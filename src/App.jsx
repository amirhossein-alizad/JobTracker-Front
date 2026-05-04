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
        <div style={{padding: "20px"}}>
            <h1>Applications</h1>

            <button onClick={() => navigate("/create")}>
                + Add Application
            </button>
            {applications.length === 0 ? (
                <p>No applications found.</p>
            ) : (
                applications.map((app) => (
                    <div
                        key={app.id}
                        style={{
                            border: "1px solid gray",
                            margin: "10px 0",
                            padding: "10px",
                            borderRadius: "8px"
                        }}
                    >
                        <h3><strong>Company:</strong> {app.company}</h3>
                        <p><strong>Role:</strong> {app.roleTitle}</p>
                        <p><strong>Location:</strong> {app.location}</p>
                        <p><strong>Status:</strong> {app.status}</p>
                        <p><strong>Id:</strong> {app.id}</p>
                        <button
                            onClick={async () => {
                                try {
                                    const res = await fetch(`http://localhost:8080/applications?id=` + app.id, {
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
                            - Remove Application
                        </button>
                    </div>
                ))
            )}
        </div>
    );
}

export default App;