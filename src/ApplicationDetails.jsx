import {useEffect, useState} from "react";
import {useParams, useNavigate} from "react-router-dom";
import "./App.css";

function ApplicationDetails() {
    const {id} = useParams();
    const navigate = useNavigate();
    const [application, setApplication] = useState(null);
    const [notes, setNotes] = useState(null);

    useEffect(() => {
        if (!id) return;

        fetch(`http://localhost:8080/applications/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            },
        })
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

    useEffect(() => {
        if (!id) return;

        fetch(`http://localhost:8080/notes/application/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            },
        })
            .then((res) => {
                if (!res.ok) {
                    throw new Error("Notes not found");
                }
                return res.json();
            })
            .then((data) => setNotes(data))
            .catch((err) => {
                console.error(err);
                alert(err.message);
            });
    }, [id]);

    if (!application) {
        return <p>Loading application...</p>;
    }

    if (notes === null) {
        return <p>Loading notes...</p>;
    }

    return (
        <div className="page">
            <div className="card">
                <div className="topBar">
                    <button className="btn secondary" onClick={() => navigate("/")}>
                        Back
                    </button>

                    <button className="btn danger"
                            onClick={async () => {
                                try {
                                    const res = await fetch(`http://localhost:8080/applications?id=` + application.id, {
                                        method: "DELETE",
                                        headers: {
                                            "Authorization": `Bearer ${localStorage.getItem("token")}`
                                        }
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
                </div>

                <h1>{application.company}</h1>
                <p className="subtitle">{application.roleTitle}</p>

                <div className="detailsGrid">
                    <p><strong>Id:</strong> {application.id}</p>
                    <p><strong>Company:</strong> {application.company}</p>
                    <p><strong>Role:</strong> {application.roleTitle}</p>
                    <p><strong>Location:</strong> {application.location}</p>
                    <p><strong>Status:</strong> {application.status}</p>
                    <p><strong>Source:</strong> {application.source}</p>
                    <p><strong>Applied Date:</strong> {application.appliedDate}</p>
                    <p><strong>Salary:</strong> {application.salaryMin} - {application.salaryMax}</p>
                </div>

                <div className="notesHeader">
                    <h2>Notes</h2>

                    <button
                        className="btn primary"
                        onClick={() => navigate("/notes/create", {
                            state: {
                                applicationId: application.id
                            }
                        })}
                    >
                        + Add Note
                    </button>
                </div>

                {notes.length === 0 ? (
                    <p className="empty">No notes</p>
                ) : (
                    <div className="notesList">
                        {notes.map((note) => (
                            <div className="noteCard" key={note.id}>
                                <div>
                                    <p>{note.text}</p>
                                    <small>{note.createdAt}</small>
                                </div>
                                <button
                                    className="btn danger"
                                    onClick={async (e) => {
                                        e.stopPropagation();

                                        try {
                                            const res = await fetch(`http://localhost:8080/notes?id=${note.id}`, {
                                                method: "DELETE",
                                                headers: {
                                                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                                                }
                                            });

                                            if (!res.ok) {
                                                throw new Error("Failed to delete note");
                                            }

                                            setNotes(notes.filter(n => n.id !== note.id));
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

export default ApplicationDetails;