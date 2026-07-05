import { useState } from "react";
import { useNavigate } from "react-router-dom";

function CreateApplication() {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        company: "",
        roleTitle: "",
        location: "",
        status: "APPLIED"
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
            const res = await fetch("http://localhost:8080/applications", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                },
                body: JSON.stringify(form)
            });

            if(res.status === 401) {
                localStorage.removeItem("token");
                navigate("/login");
            }

            if (!res.ok) {
                const text = await res.text();
                throw new Error(text || "Failed to create application");
            }

            navigate("/");
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
                            <h2>Create Application</h2>
                            <p className="subtitle">
                                Add a new job application to your tracker
                            </p>
                        </div>

                        <button
                            className="btn secondary"
                            type="button"
                            onClick={() => navigate("/")}
                        >
                            Back
                        </button>
                    </div>

                    {error && (
                        <div className="errorBox">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="formGrid">

                        <div className="formField">
                            <label>Company</label>

                            <input
                                className="input"
                                name="company"
                                placeholder="Company"
                                value={form.company}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="formField">
                            <label>Role Title</label>

                            <input
                                className="input"
                                name="roleTitle"
                                placeholder="Role Title"
                                value={form.roleTitle}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="formField">
                            <label>Location</label>

                            <input
                                className="input"
                                name="location"
                                placeholder="Location"
                                value={form.location}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="formField">
                            <label>Status</label>

                            <select
                                className="select"
                                name="status"
                                value={form.status}
                                onChange={handleChange}
                            >
                                <option value="APPLIED">APPLIED</option>
                                <option value="SCREENING">SCREENING</option>
                                <option value="INTERVIEW">INTERVIEW</option>
                                <option value="OFFER">OFFER</option>
                                <option value="REJECTED">REJECTED</option>
                            </select>
                        </div>

                        <div className="formActions">
                            <button className="btn primary" type="submit">
                                Create Application
                            </button>
                        </div>

                    </form>
                </div>
            </div>
        </div>
    );
}

export default CreateApplication;