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
        <div style={{ padding: "20px" }}>
            <h1>Login</h1>

            <form onSubmit={handleSubmit}>
                <input
                    name="username"
                    placeholder="Username"
                    value={form.username}
                    onChange={handleChange}
                />
                <br />

                <input
                    name="password"
                    type="password"
                    placeholder="Password"
                    value={form.password}
                    onChange={handleChange}
                />
                <br />

                <button type="submit">Login</button>
            </form>

            <p>
                No account? <Link to="/signup">Sign up</Link>
            </p>
        </div>
    );
}

export default Login;