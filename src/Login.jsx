import {useState} from "react";
import {useNavigate, Link} from "react-router-dom";

function Login() {
    const navigate = useNavigate();
    const [error, setError] = useState("");


    const [form, setForm] = useState({
        username: "",
        password: ""
    });

    const handleChange = (e) => {
        setForm({...form, [e.target.name]: e.target.value});
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await fetch("http://localhost:8080/users/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(form)
            });

            if (res.status === 401) {
                throw new Error("Invalid Credentials.");
            } else if (res.status !== 401 && res.status !== 200) {
                throw new Error("Login attempt failed.");
            }

            localStorage.setItem("username", form.username);

            navigate("/");


        } catch (err) {
            setError(err.message);
        }

        // fake login for now
    };

    return (
        <div className="page credential">
            <div className="container">
                <div className="card authCard">
                    <h1>Login</h1>

                    <p className="subtitle">
                        Sign in to continue tracking your job applications.
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
                            Login
                        </button>
                    </form>

                    <p className="subtitle" style={{marginTop: "16px"}}>
                        No account? <Link to="/signup">Sign up</Link>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Login;