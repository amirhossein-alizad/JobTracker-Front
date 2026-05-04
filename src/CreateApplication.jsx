import { useState } from "react";
import { useNavigate } from "react-router-dom";

function CreateApplication() {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        username: "",
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
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(form)
            });

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
        <div style={{ padding: "20px" }}>
            <h2>Create Application</h2>

            {error && (
                <p style={{ color: "red" }}>
                    {error}
                </p>
            )}

            <form onSubmit={handleSubmit}>
                <input
                    name="username"
                    placeholder="Username"
                    value={form.username}
                    onChange={handleChange}
                />
                <br />

                <input
                    name="company"
                    placeholder="Company"
                    value={form.company}
                    onChange={handleChange}
                />
                <br />

                <input
                    name="roleTitle"
                    placeholder="Role Title"
                    value={form.roleTitle}
                    onChange={handleChange}
                />
                <br />

                <input
                    name="location"
                    placeholder="Location"
                    value={form.location}
                    onChange={handleChange}
                />
                <br />

                <select
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
                <br />

                <button type="submit">Create</button>
            </form>
        </div>
    );
}

export default CreateApplication;