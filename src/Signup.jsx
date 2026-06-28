import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function Signup() {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        username: "",
        password: ""
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // fake signup for now
        localStorage.setItem("username", form.username);

        navigate("/");
    };

    return (
        <div className="page credential">
            <div className="container">
                <div className="card authCard">
                    <h1>Sign Up</h1>

                    <p className="subtitle">
                        Create an account to start tracking your applications.
                    </p>

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
m
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