import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function Login() {
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

        // fake login for now
        localStorage.setItem("username", form.username);

        navigate("/");
    };

    return (
        <div className="page credential">
            <div className="container">
                <div className="card authCard">
                    <h1>Login</h1>

                    <p className="subtitle">
                        Sign in to continue tracking your job applications.
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

                        <button className="btn authButton credential" type="submit">
                            Login
                        </button>
                    </form>

                    <p className="subtitle" style={{ marginTop: "16px" }}>
                        No account? <Link to="/signup">Sign up</Link>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Login;