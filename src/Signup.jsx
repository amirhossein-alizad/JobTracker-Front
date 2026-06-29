import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function Signup() {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        username: "",
        password: ""
    });

    const [error, setError] = useState("");


    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await fetch("http://localhost:8080/users", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(form)
            });

            if (res.status === 409) {
                const text = await res.text();
                throw new Error("User already exists.");
            } else if (res.status !== 409 && !res.ok) {
                const text = await res.text();
                throw new Error("Failed to create user.");
            }
            localStorage.setItem("username", form.username);

            navigate("/");


        } catch (err) {
            setError(err.message);
        }


    };

    return (
        <div className="page credential">
            <div className="container">
                <div className="card authCard">
                    <h1>Sign Up</h1>

                    <p className="subtitle">
                        Create an account to start tracking your applications.
                    </p>

                    {error && (
                        <div className="error">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit}>
                        <input
                            className="input"
                            name="username"
                            placeholder="Username"
                            value={form.username}
                            onChange={handleChange}
                        />

                        <input
                            className="input"
                            name="password"
                            type="password"
                            placeholder="Password"
                            value={form.password}
                            onChange={handleChange}
                        />

                        <button className="btn authButton credential" type="submit">
                            Create Account
                        </button>
                    </form>

                    <p className="subtitle" style={{ marginTop: "16px" }}>
                        Already have an account?{" "}
                        <Link to="/login">Login</Link>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Signup;