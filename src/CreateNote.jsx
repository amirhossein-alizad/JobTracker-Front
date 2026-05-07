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

            navigate("/");
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div style={{ padding: "20px" }}>
            <h2>Create Note</h2>

            {error && (
                <p style={{ color: "red" }}>
                    {error}
                </p>
            )}

            <form onSubmit={handleSubmit}>

                <input
                    name="Text"
                    placeholder="Text"
                    value={form.Text}
                    onChange={handleChange}
                />
                <br />

                <button type="submit">Create</button>
            </form>
        </div>
    );
}

export default CreateNote;