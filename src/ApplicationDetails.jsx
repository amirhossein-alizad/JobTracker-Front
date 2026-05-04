import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

function ApplicationDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [application, setApplication] = useState(null);

    useEffect(() => {
        fetch(`http://localhost:8080/applications/${id}`)
            .then((res) => {
                if (!res.ok) {
                    throw new Error("Application not found");
                }
                return res.json();
            })
            .then((data) => setApplication(data))
            .catch((err) => {
                console.error(err);
                alert(err.message);
            });
    }, [id]);

    if (!application) {
        return <p>Loading...</p>;
    }

    return (
        <div style={{ padding: "20px" }}>
            <button onClick={() => navigate("/")}>Back</button>
            <button
                onClick={async () => {
                    try {
                        const res = await fetch(`http://localhost:8080/applications?id=` + application.id, {
                            method: "DELETE"
                        });

                        if (!res.ok) {
                            throw new Error("Failed to delete application");
                        }
                        navigate("/")

                    } catch (err) {
                        console.error(err);
                        alert(err.message);
                    }
                }}
            >
                - Remove Application
            </button>

            <h1>{application.company}</h1>

            <p><strong>Id:</strong> {application.id}</p>
            <p><strong>Company:</strong> {application.company}</p>
            <p><strong>Role:</strong> {application.roleTitle}</p>
            <p><strong>Location:</strong> {application.location}</p>
            <p><strong>Status:</strong> {application.status}</p>
            <p><strong>Source:</strong> {application.source}</p>
            <p><strong>Applied Date:</strong> {application.appliedDate}</p>
            <p><strong>Job URL:</strong> {application.jobUrl}</p>
            <p><strong>Salary Min:</strong> {application.salaryMin}</p>
            <p><strong>Salary Max:</strong> {application.salaryMax}</p>
            <p><strong>Created At:</strong> {application.createdAt}</p>
            <p><strong>Updated At:</strong> {application.updatedAt}</p>
        </div>
    );
}

export default ApplicationDetails;