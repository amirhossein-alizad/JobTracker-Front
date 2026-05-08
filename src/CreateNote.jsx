import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";


function CreateNote() {
    const navigate = useNavigate();
    const location = useLocation();
    const applicationId = location.state?.applicationId;

    const [form, setForm] = useState({
        username: "",
        Text: ""
    });

    const [error, setError] = useState("");

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        try {
            const res = await fetch(`http://localhost:8080/notes/${applicationId}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(form)
            });

            if (!res.ok) {
                const text = await res.text();
                throw new Error(text || "Failed to create note");
            }

            navigate(`/applications/${applicationId}`);
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="page">
            <div className="container">
                <div className="card">

                    <div className="topBar">
                        <div>
                            <h2>Create Note</h2>
                            <p className="subtitle">
                                Add a note to this application
                            </p>
                        </div>

                        <button
                            className="btn secondary"
                            type="button"
                            onClick={() => navigate(-1)}
                        >
                            Back
                        </button>
                    </div>

                    {error && (
                        <div className="errorBox">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit}>

                        <div className="formField">
                            <label>Note</label>

                            <textarea
                                className="textarea"
                                name="Text"
                                placeholder="Write your note here..."
                                value={form.Text}
                                onChange={handleChange}
                                rows={6}
                            />
                        </div>

                        <div className="formActions">
                            <button className="btn primary" type="submit">
                                Create Note
                            </button>
                        </div>

                    </form>

                </div>
            </div>
        </div>
    );
}

export default CreateNote;